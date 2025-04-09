import type { Prisma, CheckIn } from '@prisma/client'

export interface CheckInRepository {
  findByUserId(userId: string): Promise<CheckIn[]>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUser(userId: string, page: number): Promise<CheckIn[]>
  countByUserId(userId: string): Promise<{ counter: number }>
  findById(checkInId: string): Promise<CheckIn | null>
  save(checkIn:CheckIn): Promise<CheckIn>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
