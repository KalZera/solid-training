import { Prisma, Gym, } from '@prisma/client'
import { GymRepository } from './gym-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []
  async findById (id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async create (data: Prisma.GymUncheckedCreateInput) {
    const gym = {
      id: randomUUID(),
      title: data.title as string,
      description: data.description,
      latitude: data.latitude as Prisma.Decimal,
      longitude: data.longitude as Prisma.Decimal,
      phone: data.phone ? data.phone : null,
      createdAt: new Date(),
      updatedAt: null,
    }

    this.items.push(gym)

    return gym
  }

  clear () {
    this.items = []
  }
}
