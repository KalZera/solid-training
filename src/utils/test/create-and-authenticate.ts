import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser (app:FastifyInstance) {
  await request(app.server).post(
    '/users'
  ).send({
    name: 'John Doe',
    email: 'Johndoe@email.com',
    password: '123456'
  })

  const auth = await request(app.server).post(
    '/session'
  ).send({
    email: 'Johndoe@email.com',
    password: '123456'
  })

  return {
    token: auth.body.token
  }
}
