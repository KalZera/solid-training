import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/jwt-middleware'
import { createCheckIn } from './create-check-in'
import { getCheckIn } from './get-check-in'

export async function gymRoutes (app:FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/check-ins', createCheckIn)
  app.get('/check-ins', getCheckIn)
}
