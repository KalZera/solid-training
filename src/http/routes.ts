import type { FastifyInstance } from 'fastify'
import { register } from './controller/register'
import { session } from './controller/sessions'
import { profile } from './controller/profile'
import { verifyJWT } from './middleware/jwt-middleware'

export async function routes (app:FastifyInstance) {
  app.post('/users', register)
  app.post('/session', session)

  /** authenticated routes */
  app.get('/profile', { onRequest: [verifyJWT] }, profile)
}
