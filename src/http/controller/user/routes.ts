import type { FastifyInstance } from 'fastify'
import { register } from './register'
import { session } from './sessions'
import { profile } from './profile'
import { verifyJWT } from '../../middleware/jwt-middleware'

export async function userRoutes (app:FastifyInstance) {
  app.post('/users', register)
  app.post('/session', session)

  /** authenticated routes */
  app.get('/profile', { onRequest: [verifyJWT] }, profile)
}
