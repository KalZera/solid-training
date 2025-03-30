import type { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import type { UserRepository } from 'repositories/user/user-repository'

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute({
    email,
    password,
  }:AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new Error('Invalid credentials')
    }

    return {
      user,
    }
  }
}
