import { PrismaUserRepository } from 'repositories/user/prisma-user-repository'
import { AuthenticateUseCase } from 'use-cases/authenticate'

export function makeAuthenticateUseCaseFactory () {
  const userRepository = new PrismaUserRepository()
  const authenticateUseCase = new AuthenticateUseCase(userRepository)

  return authenticateUseCase
}
