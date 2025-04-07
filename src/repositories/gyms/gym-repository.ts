import type { Prisma, Gym } from '@prisma/client'

export interface GymRepository {
  findById(id:string): Promise<Gym | null>;
  findManyByFilter(query: string, page: number): Promise<Gym[]>;
  create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>;
}
