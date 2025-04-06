import type { Prisma, CheckIn } from '@prisma/client'

export interface CheckInRepository {
  findByUserId(userId: string): Promise<CheckIn[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUser(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<{ counter: number }>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
