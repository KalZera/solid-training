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
