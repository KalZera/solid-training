import { InMemoryUserRepository } from 'repositories/user/in-memory-user-repository'
import { AuthenticateUseCase } from 'use-cases/authenticate'

export function makeAuthenticateUseCaseFactory () {
  const userRepository = new InMemoryUserRepository()
  const authenticateUseCase = new AuthenticateUseCase(userRepository)

  return authenticateUseCase
}
