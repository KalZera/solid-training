import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { env } from 'env'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { userRoutes } from 'http/controller/user/routes'
import { gymRoutes } from 'http/controller/gym/routes'
import { checkInRoutes } from 'http/controller/check-in/routes'

export const app = fastify()

app.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(gymRoutes)
app.register(checkInRoutes)
