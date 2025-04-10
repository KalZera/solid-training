import { InMemoryCheckInRepository } from 'repositories/check-ins/in-memory-check-in-repository'
import { FetchUsersCheckInHistoryUseCase } from 'use-cases/check-in'

export function makeFetchUserCheckInsUseCaseFactory () {
  const checkInRepository = new InMemoryCheckInRepository()
  const fetchUserCheckInHistoryUseCase = new FetchUsersCheckInHistoryUseCase(checkInRepository)

  return fetchUserCheckInHistoryUseCase
}
