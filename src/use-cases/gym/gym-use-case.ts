import { Gym } from '@prisma/client'
import { GymRepository } from 'repositories/gyms/gym-repository'

interface gymUseCaseInput {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  phone?: string;
}

interface gymUseCaseOutput {
  gym: Gym;
}

export class GymUseCase {
  constructor (private gymsRepository: GymRepository) {}

  async execute ({
    title,
    description,
    latitude,
    longitude,
    phone
  }: gymUseCaseInput): Promise<gymUseCaseOutput> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      latitude,
      longitude,
      phone
    })

    return {
      gym,
    }
  }
}
