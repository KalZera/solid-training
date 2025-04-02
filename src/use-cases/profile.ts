import { User } from '@prisma/client'
import { CheckInRepository } from 'repositories/check-ins/check-in-repository'
import { UserRepository } from 'repositories/user/user-repository'

interface ProfileUseCaseInput {
  id: string;
}

interface ProfileUseCaseOutput {
  user: User;
  quantityCheckIns: number;
}

export class ProfileUseCase {
  constructor (
    private userRepository: UserRepository,
    private checkinsRepository: CheckInRepository
  ) {}

  async execute ({ id }: ProfileUseCaseInput): Promise<ProfileUseCaseOutput> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new Error('User not found')
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
