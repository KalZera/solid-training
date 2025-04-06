import { User } from '@prisma/client'
import { UserRepository } from 'repositories/user/user-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface getUserProfileUseCaseInput {
  id: string;
}

interface getUserProfileUseCaseOutput {
  user: User;
}

export class GetUserProfileUseCase {
  constructor (
    private userRepository: UserRepository
  ) {}

  async execute ({ id }: getUserProfileUseCaseInput): Promise<getUserProfileUseCaseOutput> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
