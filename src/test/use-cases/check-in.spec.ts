import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryCheckInRepository } from 'repositories/check-ins/in-memory-check-in-repository'
import { InMemoryGymRepository } from 'repositories/gyms/in-memory-gym-repository'
import { CheckInUseCase } from 'use-cases/check-in'
import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'

// set variables to use in tests
let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let sut: CheckInUseCase
describe('Check-in use Case', () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()
    sut = new CheckInUseCase(checkInRepository, gymRepository)
    checkInRepository.clear()

    gymRepository.items.push({
      id: 'gym-id',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'Gym Title',
      description: 'Gym Description',
      phone: '123456789',
      latitude: new Decimal(-23.5505),
      longitude: new Decimal(-46.6333),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to checkin', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })

    expect(checkIn.id).toEqual(expect.any(String))
    expect(checkIn).not.toBeNull()
  })
  it('should not be able to checkin with no gym registered', async () => {
    await expect(() => sut.execute({
      userId: 'user-id',
      gymId: 'gym-not-registered',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })).rejects.toBeInstanceOf(Error)
  })
  it('should not be able to checkin twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0))

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })

    await expect(() => sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })).rejects.toBeInstanceOf(Error)
  })
  it('should  be able to checkin twice but in diferent days', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 12, 0, 0))

    await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })

    vi.setSystemTime(new Date(2023, 0, 3, 12, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-id',
      gymId: 'gym-id',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
