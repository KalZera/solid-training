import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { env } from 'env'
import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { routes } from 'http/routes'

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

app.register(routes)
