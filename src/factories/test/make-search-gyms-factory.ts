import { InMemoryGymRepository } from 'repositories/gyms/in-memory-gym-repository'
import { SearchGymsHistoryUseCase } from 'use-cases/gym'

export function makeSearchGymsUseCaseFactory () {
  const gymRepository = new InMemoryGymRepository()
  const searchGymsUseCase = new SearchGymsHistoryUseCase(gymRepository)

  return searchGymsUseCase
}
