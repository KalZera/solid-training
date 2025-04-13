import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/jwt-middleware'
import { createGym } from './create-gym'

export async function gymRoutes (app:FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gym', createGym)
}
