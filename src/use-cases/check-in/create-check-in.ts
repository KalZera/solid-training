import { CheckIn } from '@prisma/client'
import { CheckInRepository } from 'repositories/check-ins/check-in-repository'

interface checkiInUseCaseInput {
  userId: string;
  gymId: string;
}

interface checkInUseCaseOutput {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor (
    private checkinsRepository: CheckInRepository
  ) {}

  async execute ({ userId, gymId }: checkiInUseCaseInput): Promise<checkInUseCaseOutput> {
    const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) {
      throw new Error('User already checked in today')
    }

    const checkIn = await this.checkinsRepository.create({
      userId,
      gymId,
    })

    return {
      checkIn
    }
  }
}
