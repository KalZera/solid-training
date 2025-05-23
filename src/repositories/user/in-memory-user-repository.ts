import { Prisma, User } from '@prisma/client'
import { UserRepository } from './user-repository'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []
  async findById (id: string) {
    const user = this.items.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail (email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create (data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date(),
      updatedAt: null,
    }

    this.items.push(user)

    return user
  }

  clear () {
    this.items = []
  }
}
