import { InMemoryUserRepository } from 'repositories/in-memory-user-repository'
import { RegisterUseCase } from 'use-cases/register'
import { expect, describe, it, beforeEach } from 'vitest'

describe('register use Case', () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    const inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUserRepository.clear()
  })
  it('should be able to register', async () => {
    const registerUseCase = new RegisterUseCase(new InMemoryUserRepository())

    const user = await registerUseCase.execute({
      name: 'John Doe',
      password: '123456',
      email: 'johnDoe@email.com',
    })

    expect(user).toEqual({
      user: expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
      }),
    })
    expect(user).not.toBeNull()
  })

  it('should not be able to register with same email twice', async () => {
    const registerUseCase = new RegisterUseCase(new InMemoryUserRepository())

    await registerUseCase.execute({
      name: 'John Doe',
      password: '123456',
      email: 'user1@email.com',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        password: '123456',
        email: 'user1@email.com',
      }),
    ).rejects.toThrow('User already exists')
  })
})
