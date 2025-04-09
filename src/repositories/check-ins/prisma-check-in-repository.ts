import { CheckIn, Prisma } from '@prisma/client'
import { prisma } from 'lib/prisma'
import { CheckInRepository } from './check-in-repository'
import dayjs from 'dayjs'

export class PrismaCheckInRepository implements CheckInRepository {
  async findByUserId (userId: string): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        userId,
      }
    })

    return checkIns
  }

  async findByUserIdOnDate (userId: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: startOfDay.toDate(),
          lte: endOfDay.toDate(),
        }
      }
    })
    return checkIn
  }

  async findManyByUser (userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    if (!checkIns) {
      return []
    }

    return checkIns
  }

  async countByUserId (userId: string): Promise<{ counter: number }> {
    const countCheckIns = await prisma.checkIn.count({
      where: {
        userId,
      }
    })

    return { counter: countCheckIns }
  }

  async findById (checkInId: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInId,
      }
    })

    return checkIn
  }

  async save (checkIn: CheckIn): Promise<CheckIn> {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: {
        ...checkIn,
      }
    })

    return updatedCheckIn
  }

  async create (data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }
}
