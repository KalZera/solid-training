import { User } from '@prisma/client'
import { CheckInRepository } from 'repositories/check-ins/check-in-repository'
import { UserRepository } from 'repositories/user/user-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface getUserProfileUseCaseInput {
  id: string;
}

interface getUserProfileUseCaseOutput {
  user: User;
  quantityCheckIns: number;
}

export class GetUserProfileUseCase {
  constructor (
    private userRepository: UserRepository,
    private checkinsRepository: CheckInRepository
  ) {}

  async execute ({ id }: getUserProfileUseCaseInput): Promise<getUserProfileUseCaseOutput> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const counterCheckIns = await this.checkinsRepository.countByUserId(
      user.id
    )

    return {
      user,
      quantityCheckIns: counterCheckIns.counter,
    }
  }
}
