import { CheckIn } from '@prisma/client'
import { CheckInRepository } from 'repositories/check-ins/check-in-repository'

interface fetchUsercheckInHistoryUseCaseInput {
  userId: string;
  page: number;
}

interface fetchUsercheckInHistoryUseCaseOutput {
  checkIns: CheckIn[];
}

export class FetchUsersCheckInHistoryUseCase {
  constructor (
    private checkinsRepository: CheckInRepository
  ) {}

  async execute ({
    userId,
    page
  }: fetchUsercheckInHistoryUseCaseInput): Promise<fetchUsercheckInHistoryUseCaseOutput> {
    const checkIns = await this.checkinsRepository.findManyByUser(userId, page)

    return {
      checkIns,
    }
  }
}
