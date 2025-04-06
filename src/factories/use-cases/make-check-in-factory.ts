import { PrismaGymRepository } from 'repositories/gyms/prisma-gym-repository'
import { PrismaCheckInRepository } from 'repositories/check-ins/prisma-check-in-repository'
import { CheckInUseCase } from 'use-cases/check-in'

export function makeCheckInUseCaseFactory () {
  const gymRepository = new PrismaGymRepository()
  const checkInRepository = new PrismaCheckInRepository()
  const checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository)

  return checkInUseCase
}
