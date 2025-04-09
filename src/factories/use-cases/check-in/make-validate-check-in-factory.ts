import { PrismaCheckInRepository } from 'repositories/check-ins/prisma-check-in-repository'
import { ValidateCheckInUseCase } from 'use-cases/check-in'

export function makeFetchUserCheckInsUseCaseFactory () {
  const checkInRepository = new PrismaCheckInRepository()
  const validateCheckInsUseCase = new ValidateCheckInUseCase(checkInRepository)

  return validateCheckInsUseCase
}
