import { CheckIn } from '@prisma/client'
import { CheckInRepository } from 'repositories/check-ins/check-in-repository'
import { GymRepository } from 'repositories/gyms/gym-repository'
import { ResourceNotFoundError } from 'use-cases/errors/resource-not-found-error'

interface checkiInUseCaseInput {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface checkInUseCaseOutput {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor (
    private checkinsRepository: CheckInRepository,
    private gymsRepository: GymRepository
  ) {}

  async execute ({
    userId,
    gymId
  }: checkiInUseCaseInput): Promise<checkInUseCaseOutput> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calculate distance between user and gym

    const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDay) {
      throw new Error('User already checked in today')
    }

    const checkIn = await this.checkinsRepository.create({
      userId,
      gymId,
    })

    return {
      checkIn,
    }
  }
}
