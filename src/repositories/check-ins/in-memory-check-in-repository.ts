import { Prisma, CheckIn, } from '@prisma/client'
import { CheckInRepository } from './check-in-repository'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = []

  async findByUserId (userId: string) {
    const checkIns = this.items.filter((checkin) => checkin.userId === userId)

    if (!checkIns) {
      return []
    }

    return checkIns
  }

  async findManyByUser (userId: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((checkin) => checkin.userId === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async findByUserIdOnDate (userId: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkIn = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.createdAt)
      const isOnSameDay = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

      return checkin.userId === userId && isOnSameDay
    })

    if (!checkIn) {
      return null
    }

    return checkIn
  }

  async countByUserId (userId: string): Promise<{ counter: number }> {
    const checkIns = this.items.filter((checkin) => checkin.userId === userId)

    if (!checkIns) {
      return { counter: 0 }
    }

    return { counter: checkIns.length }
  }

  async findById (checkInId: string) {
    const checkIn = this.items.find((checkin) => checkin.id === checkInId)

    return checkIn ?? null
  }

  async save (checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((checkin) => checkin.id === checkIn.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async create (data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: data.id ?? randomUUID(),
      gymId: data.gymId,
      userId: data.userId,
      createdAt: new Date(),
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
    }

    this.items.push(checkIn)

    return checkIn
  }

  clear () {
    this.items = []
  }
}
