import { CheckInRepository } from 'repositories/check-ins/check-in-repository'

interface getCounterCheckInUseCaseInput {
  userId: string;
}

interface getCounterCheckInUseCaseOutput {
  counter: number;
}

export class GetCounterCheckInUseCase {
  constructor (
    private checkinsRepository: CheckInRepository
  ) {}

  async execute ({
    userId,
  }: getCounterCheckInUseCaseInput): Promise<getCounterCheckInUseCaseOutput> {
    const { counter } = await this.checkinsRepository.countByUserId(userId)

    return {
      counter,
    }
  }
}
