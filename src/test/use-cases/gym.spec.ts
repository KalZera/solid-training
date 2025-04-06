import { InMemoryGymRepository } from 'repositories/gyms/in-memory-gym-repository'
import { GymUseCase } from 'use-cases/gym'
import { expect, describe, it, beforeEach } from 'vitest'

// set variables to use in tests
let gymRepository: InMemoryGymRepository
let sut: GymUseCase
describe('Gym use Case', () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    gymRepository = new InMemoryGymRepository()
    sut = new GymUseCase(gymRepository)
    gymRepository.clear()
  })

  it('should be able to regiter gym ', async () => {
    const { gym } = await sut.execute({
      title: 'Gym Title',
      description: null,
      phone: null,
      latitude: -23.5505,
      longitude: -46.6333,
    })

    expect(gym.id).toEqual(expect.any(String))
    expect(gym).not.toBeNull()
  })
})
