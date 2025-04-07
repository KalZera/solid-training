import { InMemoryGymRepository } from 'repositories/gyms/in-memory-gym-repository'
import { SearchGymsHistoryUseCase } from 'use-cases/gym'
import { expect, describe, it, beforeEach } from 'vitest'

// set variables to use in tests
let gymRepository: InMemoryGymRepository
let sut: SearchGymsHistoryUseCase
describe('Search gyms use Case', () => {
  beforeEach(async () => {
    // Clear the in-memory user repository before each test
    gymRepository = new InMemoryGymRepository()
    sut = new SearchGymsHistoryUseCase(gymRepository)
    gymRepository.clear()
  })

  it('should be able to search gym by query ', async () => {
    await gymRepository.create({
      latitude: 0,
      longitude: 0,
      title: 'gym-01',
      description: 'gym-01',
    })
    await gymRepository.create({
      latitude: 0,
      longitude: 0,
      title: 'gym-02',
      description: 'gym-02',
    })

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'gym-01',
      }),
      expect.objectContaining({
        title: 'gym-02',
      }),
    ])
  })
  it('should be able to not find any gym', async () => {
    const { gyms } = await sut.execute({
      query: 'gym',
      page: 1,
    })

    expect(gyms).toEqual([])
  })
  it('should be able to fetch gyms paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        latitude: 0,
        longitude: 0,
        description: 'gym-01',
        title: `gym-${i}`,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'gym-21',
      }),
      expect.objectContaining({
        title: 'gym-22',
      }),
    ])
  })
})
