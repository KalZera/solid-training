import { InMemoryCheckInRepository } from 'repositories/check-ins/in-memory-check-in-repository'
import { InMemoryUserRepository } from 'repositories/user/in-memory-user-repository'
import { ProfileUseCase } from 'use-cases/profile'
import { expect, describe, it, beforeEach } from 'vitest'

// set variables to use in tests
let userRepository: InMemoryUserRepository
let checkinsRepository: InMemoryCheckInRepository
let sut: ProfileUseCase
describe('register use Case', () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    userRepository = new InMemoryUserRepository()
    checkinsRepository = new InMemoryCheckInRepository()
    sut = new ProfileUseCase(userRepository, checkinsRepository)
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
      }),
      quantityCheckIns: 0,
    })
    expect(profile).not.toBeNull()
  })
  it('should be able to get the user infos in profile with one checkin', async () => {
    const user = await userRepository.create({
      name: 'John Doe',
      password_hash: '123456',
      email: 'johnDoe@email.com',
    })

    await checkinsRepository.create({
      gymId: 'gym-1',
      userId: user.id,
      validatedAt: new Date(),
      createdAt: new Date(),
    })

    const profile = await sut.execute({
      id: user.id,
    })
    expect(profile).toEqual({
      user: expect.objectContaining({
        id: user.id,
      }),
      quantityCheckIns: 1,
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
    ).rejects.toThrow('User not found')
  })
})
