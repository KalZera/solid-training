import { CheckIn, Prisma } from '@prisma/client'
import { prisma } from 'lib/prisma'
import { CheckInRepository } from './check-in-repository'

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
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        createdAt: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lte: new Date(date.setHours(23, 59, 59, 999)),
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

  async create (data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }
}
