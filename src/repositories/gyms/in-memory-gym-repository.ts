import { Prisma, Gym, } from '@prisma/client'
import { GymRepository } from './gym-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from 'utils/get-distance-between-coordinates'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []
  async findById (id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }

  async findManyByFilter (query: string, page:number) {
    const gyms = this.items.filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
    return gyms
  }

  async findManyNearBy (userLatitude:number, userLongitude:number, page:number) {
    const gyms = this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber() }
      )
      return distance < 10
    })
      .slice((page - 1) * 20, page * 20)
    return gyms
  }

  async create (data: Prisma.GymUncheckedCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      latitude: data.latitude as Prisma.Decimal,
      longitude: data.longitude as Prisma.Decimal,
      phone: data.phone ?? null,
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
