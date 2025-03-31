import { PrismaUserRepository } from 'repositories/user/prisma-user-repository'
import { ProfileUseCase } from 'use-cases/profile'

export function makeProfileUseCaseFactory() {
  const userRepository = new PrismaUserRepository()
  const profileUseCase = new ProfileUseCase(userRepository)

  return profileUseCase
}
