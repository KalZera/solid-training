import { InMemoryUserRepository } from 'repositories/user/in-memory-user-repository'
import { GetUserProfileUseCase } from 'use-cases/user/get-user-profile'

export function makeProfileUseCaseFactory () {
  const userRepository = new InMemoryUserRepository()
  const profileUseCase = new GetUserProfileUseCase(userRepository)

  return profileUseCase
}
