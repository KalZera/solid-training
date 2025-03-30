import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserRepository } from 'repositories/user/user-repository'

interface RegisterUseCaseInput {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseOutput {
  user: Partial<User>
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}
  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseInput):Promise<RegisterUseCaseOutput> {
    const password_hash = await hash(password, 8)
    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new Error('User already exists.')
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    })
    return {
      user,
    }
  }
}
