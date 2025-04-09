import { PrismaUserRepository } from 'repositories/user/prisma-user-repository'
import { AuthenticateUseCase } from 'use-cases/session/authenticate'

export function makeAuthenticateUseCaseFactory () {
  const userRepository = new PrismaUserRepository()
  const authenticateUseCase = new AuthenticateUseCase(userRepository)

  return authenticateUseCase
}
