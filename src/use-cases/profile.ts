import type { User } from '@prisma/client'
import { UserRepository } from 'repositories/user/user-repository'

interface ProfileUseCaseInput {
  id: string;
}

interface ProfileUseCaseOutput {
  user: User;
}

export class ProfileUseCase {
  constructor (private userRepository: UserRepository) {}
  async execute ({ id }: ProfileUseCaseInput): Promise<ProfileUseCaseOutput> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      user,
    }
  }
}
