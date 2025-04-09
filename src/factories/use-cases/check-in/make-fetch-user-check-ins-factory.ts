import { PrismaCheckInRepository } from 'repositories/check-ins/prisma-check-in-repository'
import { FetchUsersCheckInHistoryUseCase } from 'use-cases/check-in'

export function makeFetchUserCheckInsUseCaseFactory () {
  const checkInRepository = new PrismaCheckInRepository()
  const fetchUserCheckInHistoryUseCase = new FetchUsersCheckInHistoryUseCase(checkInRepository)

  return fetchUserCheckInHistoryUseCase
}
