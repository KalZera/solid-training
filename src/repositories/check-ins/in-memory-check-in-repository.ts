import { Prisma, CheckIn, } from '@prisma/client'
import type { CheckInRepository } from './check-in-repository'

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async findByUserId (userId: string) {
    const checkIns = this.items.filter((checkin) => checkin.userId === userId)

    if (!checkIns) {
      return []
    }

    return checkIns
  }

  async countByUserId (userId: string): Promise<{ counter: number }> {
    const checkIns = this.items.filter((checkin) => checkin.userId === userId)

    if (!checkIns) {
      return { counter: 0 }
    }

    return { counter: checkIns.length }
  }

  async create (data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: 'check-in-1',
      gymId: data.gymId,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: null,
      validatedAt: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  clear () {
    this.items = []
  }
}
