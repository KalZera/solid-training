import { PrismaUserRepository } from 'repositories/user/prisma-user-repository'
import { PrismaCheckInRepository } from 'repositories/check-ins/prisma-check-in-repository'
import { ProfileUseCase } from 'use-cases/profile'

export function makeProfileUseCaseFactory () {
  const userRepository = new PrismaUserRepository()
  const checkInRepository = new PrismaCheckInRepository()
  const profileUseCase = new ProfileUseCase(userRepository, checkInRepository)

  return profileUseCase
}
