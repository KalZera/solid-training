import { InMemoryCheckInRepository } from 'repositories/check-ins/in-memory-check-in-repository'
import { ValidateCheckInUseCase } from 'use-cases/check-in'

export function makeFetchUserCheckInsUseCaseFactory () {
  const checkInRepository = new InMemoryCheckInRepository()
  const validateCheckInsUseCase = new ValidateCheckInUseCase(checkInRepository)

  return validateCheckInsUseCase
}
