import { PrismaGymRepository } from 'repositories/gyms/prisma-gym-repository'
import { SearchGymsHistoryUseCase } from 'use-cases/gym'

export function makeSearchGymsUseCaseFactory () {
  const gymRepository = new PrismaGymRepository()
  const searchGymsUseCase = new SearchGymsHistoryUseCase(gymRepository)

  return searchGymsUseCase
}
