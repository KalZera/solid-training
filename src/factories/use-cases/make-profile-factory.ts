import { PrismaUserRepository } from 'repositories/user/prisma-user-repository'
import { PrismaCheckInRepository } from 'repositories/check-ins/prisma-check-in-repository'
import { GetUserProfileUseCase } from 'use-cases/user/get-user-profile'

export function makeProfileUseCaseFactory () {
  const userRepository = new PrismaUserRepository()
  const checkInRepository = new PrismaCheckInRepository()
  const profileUseCase = new GetUserProfileUseCase(userRepository, checkInRepository)

  return profileUseCase
}
