import { PrismaGymRepository } from 'repositories/gyms/prisma-gym-repository'
import { GymUseCase } from 'use-cases/gym'

export function makeGymUseCaseFactory () {
  const gymRepository = new PrismaGymRepository()
  const gymUseCase = new GymUseCase(gymRepository)

  return gymUseCase
}
