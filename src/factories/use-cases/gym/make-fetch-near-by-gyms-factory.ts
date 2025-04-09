import { PrismaGymRepository } from 'repositories/gyms/prisma-gym-repository'
import { FetchNearByGymsUseCase } from 'use-cases/gym'

export function makeFetchNearByGymsUseCaseFactory () {
  const gymRepository = new PrismaGymRepository()
  const fetchNearByGymUseCase = new FetchNearByGymsUseCase(gymRepository)

  return fetchNearByGymUseCase
}
