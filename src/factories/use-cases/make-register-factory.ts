import { PrismaUserRepository } from 'repositories/user/prisma-user-repository'
import { RegisterUseCase } from 'use-cases/user'

export function makeRegisterUseCaseFactory () {
  const userRepository = new PrismaUserRepository()
  const registerUseCase = new RegisterUseCase(userRepository)

  return registerUseCase
}
