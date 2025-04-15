import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from 'lib/prisma'
import { hash } from 'bcryptjs'
type UserRole = 'ADMIN' | 'MEMBER'

export async function createAndAuthenticateUser (app:FastifyInstance, roleSended?: UserRole) {
  const pass = await hash('123456', 8)
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'Johndoe@example.com',
      password_hash: pass,
      role: roleSended ?? 'MEMBER'
    }
  })

  const auth = await request(app.server).post(
    '/session'
  ).send({
    email: 'Johndoe@example.com',
    password: '123456'
  })

  return {
    token: auth.body.token
  }
}
