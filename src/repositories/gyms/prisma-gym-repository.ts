import { Prisma, Gym } from '@prisma/client'
import { prisma } from 'lib/prisma'
import type { GymRepository } from './gym-repository'

export class PrismaGymRepository implements GymRepository {
  async findManyByFilter (query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearBy (latitude: number, longitude: number, page: number): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
      LIMIT 20 OFFSET ${(page - 1) * 20}
      `

    return gyms
  }

  async findById (id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async create (data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
