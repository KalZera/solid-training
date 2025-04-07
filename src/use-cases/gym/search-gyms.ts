import { Gym } from '@prisma/client'
import { GymRepository } from 'repositories/gyms/gym-repository'

interface searchGymsUseCaseInput {
  query: string;
  page: number;
}

interface searchGymsUseCaseOutput {
  gyms: Gym[];
}

export class SearchGymsHistoryUseCase {
  constructor (
    private gymRepository: GymRepository
  ) {}

  async execute ({
    query,
    page
  }: searchGymsUseCaseInput): Promise<searchGymsUseCaseOutput> {
    const gyms = await this.gymRepository.findManyByFilter(query, page)

    return {
      gyms,
    }
  }
}
