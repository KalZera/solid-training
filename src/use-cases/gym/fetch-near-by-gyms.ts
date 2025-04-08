import { Gym } from '@prisma/client'
import { GymRepository } from 'repositories/gyms/gym-repository'

interface fetchNearByGymsUseCaseInput {
  userLatitude: number;
  userLongitude: number;
  page: number;
}

interface fetchNearByGymsUseCaseOutput {
  gyms: Gym[];
}

export class FetchNearByGymsUseCase {
  constructor (
    private gymRepository: GymRepository
  ) {}

  async execute ({
    userLatitude,
    userLongitude,
    page
  }: fetchNearByGymsUseCaseInput): Promise<fetchNearByGymsUseCaseOutput> {
    const gyms = await this.gymRepository.findManyNearBy(userLatitude, userLongitude, page)

    return {
      gyms,
    }
  }
}
