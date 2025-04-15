import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/jwt-middleware'
import { createGym } from './create-gym'
import { searchGym } from './search-gyms'
import { nearByGym } from './near-by-gyms'
import { verifyUserRole } from 'http/middleware/verify-user-role'

export async function gymRoutes (app:FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGym)
  app.get('/gyms', searchGym)
  app.get('/gyms/nearby', nearByGym)
}
