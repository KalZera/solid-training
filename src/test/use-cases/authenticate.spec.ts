import { hash } from 'bcryptjs'
import { InMemoryUserRepository } from 'repositories/user/in-memory-user-repository'
import { AuthenticateUseCase } from 'use-cases/authenticate'

import { expect, describe, it, beforeEach } from 'vitest'

describe('authenticate use Case', () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    const inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryUserRepository.clear()
  })
  it('should be able to authenticate', async () => {
    const userRepository = new InMemoryUserRepository()
    const authenticate = new AuthenticateUseCase(userRepository)
    const email = 'johnDoe@email.com';

    userRepository.create({
      name: 'John Doe',
      email,
      password_hash: await hash('123456', 8),
    });


    const userAuthenticated = await authenticate.execute({
      email,
      password: '123456',
    })

    expect(userAuthenticated).toBeTruthy()
  })

  it('should not authenticate with wrong email ', async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthenticateUseCase(userRepository)
    const email = 'johnDoe@email.com';

    userRepository.create({
      name: 'John Doe',
      email,
      password_hash: await hash('123456', 8),
    });

   await expect(sut.execute({
    password: await hash('123456', 8),
    email: 'user1@email.com', 
  })).rejects.toThrow(
      'Invalid credentials',
    );
  })
})
