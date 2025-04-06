import { InMemoryUserRepository } from 'repositories/user/in-memory-user-repository'
import { GetUserProfileUseCase } from 'use-cases/user'
import { expect, describe, it, beforeEach } from 'vitest'

// set variables to use in tests
let userRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase
describe('register use Case', () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    userRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(userRepository)
    userRepository.clear()
  })
  it('should be able to get the user infos in profile without checkin', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      password_hash: '123456',
      email: 'johnDoe@email.com',
    })

    const profile = await sut.execute({
      id: user.id,
    })
    expect(profile).toEqual({
      user: expect.objectContaining({
        id: user.id,
      })
    })
    expect(profile).not.toBeNull()
  })
  it('should be able to get the user infos in profile with one checkin', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      password_hash: '123456',
      email: 'johnDoe@email.com',
    })

    const profile = await sut.execute({
      id: user.id,
    })
    expect(profile).toEqual({
      user: expect.objectContaining({
        id: user.id,
      }),
    })
    expect(profile).not.toBeNull()
  })

  it('should throw error when not found user profile ', async () => {
    await userRepository.create({
      name: 'John Doe',
      password_hash: '123456',
      email: 'user1@email.com',
    })

    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
      })
    ).rejects.toThrow('Resource not found')
  })
})
