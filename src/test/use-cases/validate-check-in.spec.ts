import { InMemoryCheckInRepository } from 'repositories/check-ins/in-memory-check-in-repository'
import { ValidateCheckInUseCase } from 'use-cases/check-in'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

// set variables to use in tests
let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase
describe('Validate check-in use Case', () => {
  beforeEach(async () => {
    // Clear the in-memory user repository before each test
    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInUseCase(checkInRepository)
    checkInRepository.clear()

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate checkin', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0))
    const createdCheckIn = await checkInRepository.create({
      id: 'check-in-id',
      userId: 'user-id',
      gymId: 'gym-id',
    })
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })
    expect(checkIn.id).toBe('check-in-id')
    expect(checkIn.validatedAt).toEqual(expect.any(Date))
    expect(checkIn).not.toBeNull()
  })
  it('should not be able to validate checkin after time limit creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0))
    await checkInRepository.create({
      id: 'check-in-id',
      userId: 'user-id',
      gymId: 'gym-id',
    })

    vi.advanceTimersByTime(30 * 60 * 1000) // 30 minutes
    await expect(() => sut.execute({
      checkInId: 'check-in-id',
    })).rejects.toBeInstanceOf(Error)
  })
  it('should not be able to validate checkin with no check in', async () => {
    await expect(() => sut.execute({
      checkInId: 'invalid-check-in-id',
    })).rejects.toBeInstanceOf(Error)
  })
})
