import { Prisma, Gym } from '@prisma/client'
import { prisma } from 'lib/prisma'
import type { GymRepository } from './gym-repository'

export class PrismaGymRepository implements GymRepository {
  findById (id: string): Promise<Gym | null> {
    throw new Error('Method not implemented.')
  }

  async create (data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
