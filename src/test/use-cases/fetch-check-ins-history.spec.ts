import { InMemoryCheckInRepository } from 'repositories/check-ins/in-memory-check-in-repository'
import { FetchUsersCheckInHistoryUseCase } from 'use-cases/check-in'
import { expect, describe, it, beforeEach } from 'vitest'

// set variables to use in tests
let checkInRepository: InMemoryCheckInRepository
let sut: FetchUsersCheckInHistoryUseCase
describe('Fetch Check-in use Case', () => {
  beforeEach(async () => {
    // Clear the in-memory user repository before each test
    checkInRepository = new InMemoryCheckInRepository()
    sut = new FetchUsersCheckInHistoryUseCase(checkInRepository)
    checkInRepository.clear()
  })

  it('should be able to fetch check ins ', async () => {
    await checkInRepository.create({
      userId: 'user-id',
      gymId: 'gym-01',
    })
    await checkInRepository.create({
      userId: 'user-id',
      gymId: 'gym-02',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gymId: 'gym-01',
      }),
      expect.objectContaining({
        gymId: 'gym-02',
      }),
    ])
  })
  it('should be able to not find checkin history', async () => {
    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 1,
    })

    expect(checkIns).toEqual([])
  })
  it('should be able to fetch checkins paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        userId: 'user-id',
        gymId: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gymId: 'gym-21',
      }),
      expect.objectContaining({
        gymId: 'gym-22',
      }),
    ])
  })
})
