import { CheckIn } from '@prisma/client'
import { CheckInRepository } from 'repositories/check-ins/check-in-repository'
import dayJs from 'dayjs'
import { ResourceNotFoundError } from 'use-cases/errors/resource-not-found-error'

interface validateCheckInUseCaseInput {
  checkInId: string;
}
interface validateCheckInUseCaseOutput {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor (
    private checkInRepository: CheckInRepository
  ) {}

  async execute ({
    checkInId,
  }: validateCheckInUseCaseInput): Promise<validateCheckInUseCaseOutput> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const diferenceInMinutesFromCheckinCreation = dayJs(new Date())
      .diff(checkIn.createdAt, 'minute')

    if (diferenceInMinutesFromCheckinCreation > 20) {
      throw new Error('Check-in expired')
    }
    checkIn.validatedAt = new Date()
    await this.checkInRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
