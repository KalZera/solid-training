import { InMemoryGymRepository } from 'repositories/gyms/in-memory-gym-repository'
import { GymUseCase } from 'use-cases/gym'

export function makeGymUseCaseFactory () {
  const gymRepository = new InMemoryGymRepository()
  const gymUseCase = new GymUseCase(gymRepository)

  return gymUseCase
}
