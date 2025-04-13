import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/jwt-middleware'
import { createGym } from './create-gym'
import { searchGym } from './search-gyms'
import { nearByGym } from './near-by-gyms'

export async function gymRoutes (app:FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/gyms', createGym)
  app.get('/gyms', searchGym)
  app.get('/gyms/nearby', nearByGym)
}
