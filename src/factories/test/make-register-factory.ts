import { InMemoryUserRepository } from 'repositories/user/in-memory-user-repository'
import { RegisterUseCase } from 'use-cases/user/register'

export function makeRegisterFactory () {
  const userRepository = new InMemoryUserRepository()
  const registerUseCase = new RegisterUseCase(userRepository)

  return registerUseCase
}
