import { PrismaCheckInRepository } from 'repositories/check-ins/prisma-check-in-repository'
import { GetCounterCheckInUseCase } from 'use-cases/check-in'

export function makeFetchUserCheckInsUseCaseFactory () {
  const checkInRepository = new PrismaCheckInRepository()
  const getCounterCheckInsUseCase = new GetCounterCheckInUseCase(checkInRepository)

  return getCounterCheckInsUseCase
}
