import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryGymRepository } from 'repositories/gyms/in-memory-gym-repository'
import { FetchNearByGymsUseCase } from 'use-cases/gym'
import { expect, describe, it, beforeEach } from 'vitest'

// set variables to use in tests
let gymRepository: InMemoryGymRepository
let sut: FetchNearByGymsUseCase
describe('Fetch Check-in use Case', () => {
  beforeEach(async () => {
    // Clear the in-memory user repository before each test
    gymRepository = new InMemoryGymRepository()
    sut = new FetchNearByGymsUseCase(gymRepository)
    gymRepository.clear()
  })

  it('should be able to fetch gyms with less distance', async () => {
    await gymRepository.create({
      title: 'Gym Title',
      description: null,
      phone: null,
      latitude: new Decimal(-23.5505),
      longitude: new Decimal(-46.6333),
    })
    await gymRepository.create({
      title: 'Gym Title 2',
      description: null,
      phone: null,
      latitude: new Decimal(-23.5505),
      longitude: new Decimal(-46.6333),
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
      page: 1,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Gym Title',
      }),
      expect.objectContaining({
        title: 'Gym Title 2',
      }),
    ])
  })
  it('should be able to not find gyms with more distance', async () => {
    await gymRepository.create({
      title: 'Gym Title',
      description: null,
      phone: null,
      latitude: new Decimal(-23.5505),
      longitude: new Decimal(-46.6333),
    })

    await gymRepository.create({
      title: 'Gym Title 2',
      description: null,
      phone: null,
      latitude: new Decimal(-19.900181),
      longitude: new Decimal(-43.8195373),
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Gym Title',
      }),
    ])
  })
  it('should be able to fetch gyms in distance paginated', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Gym Title ${i}`,
        description: null,
        phone: null,
        latitude: new Decimal(-23.5505),
        longitude: new Decimal(-46.6333),
      })
    }

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
      page: 2,
    })

    expect(gyms).toHaveLength(2)
  })
  it('should not be able to fetch gyms in large distance', async () => {
    await gymRepository.create({
      title: 'Gym Title',
      description: null,
      phone: null,
      latitude: new Decimal(-23.5505),
      longitude: new Decimal(-46.6333),
    })

    const { gyms } = await sut.execute({
      userLatitude: -19.900181,
      userLongitude: -43.8195373,
      page: 1,
    })

    expect(gyms).toHaveLength(0)
    expect(gyms).toEqual([])
  })
})
