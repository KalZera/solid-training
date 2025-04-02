import type { Prisma, CheckIn } from '@prisma/client'

export interface CheckInRepository {
  findByUserId(userId: string): Promise<CheckIn[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<{ counter: number }>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
