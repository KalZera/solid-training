import { InMemoryCheckInRepository } from 'repositories/check-ins/in-memory-check-in-repository'
import { CheckInUseCase } from 'use-cases/check-in'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

// set variables to use in tests
let checkInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase
describe('Check-in use Case', () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    checkInRepository = new InMemoryCheckInRepository()
    sut = new CheckInUseCase(checkInRepository)
    checkInRepository.clear()

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to checkin', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn).not.toBeNull()
  })
  it('should not be able to checkin twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0))

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    await expect(() => sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })).rejects.toBeInstanceOf(Error)
  })
  it('should  be able to checkin twice but in diferent days', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0))

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    vi.setSystemTime(new Date(2023, 0, 3, 12, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
