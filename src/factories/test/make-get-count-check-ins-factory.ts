import { InMemoryCheckInRepository } from 'repositories/check-ins/in-memory-check-in-repository'
import { GetCounterCheckInUseCase } from 'use-cases/check-in'

export function makeFetchUserCheckInsUseCaseFactory () {
  const checkInRepository = new InMemoryCheckInRepository()
  const getCounterCheckInsUseCase = new GetCounterCheckInUseCase(checkInRepository)

  return getCounterCheckInsUseCase
}
