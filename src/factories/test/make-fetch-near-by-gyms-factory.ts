import { InMemoryGymRepository } from 'repositories/gyms/in-memory-gym-repository'
import { FetchNearByGymsUseCase } from 'use-cases/gym'

export function makeFetchNearByGymsUseCaseFactory () {
  const gymRepository = new InMemoryGymRepository()
  const fetchNearByGymUseCase = new FetchNearByGymsUseCase(gymRepository)

  return fetchNearByGymUseCase
}
