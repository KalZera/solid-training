import { PrismaUserRepository } from 'repositories/user/prisma-user-repository'
import { GetUserProfileUseCase } from 'use-cases/user/get-user-profile'

export function makeProfileUseCaseFactory () {
  const userRepository = new PrismaUserRepository()
  const profileUseCase = new GetUserProfileUseCase(userRepository)

  return profileUseCase
}
