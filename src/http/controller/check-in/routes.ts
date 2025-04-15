import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middleware/jwt-middleware'
import { createCheckIn } from './create-check-in'
import { getCheckIn } from './get-check-in-by-user'
import { metricsCheckIn } from './metrics-check-in'
import { validateCheckIn } from './validate-check-in'

export async function checkInRoutes (app:FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.get('/check-ins', getCheckIn)
  app.get('/check-ins/metrics', metricsCheckIn)
  app.patch('/check-ins/:checkInId/validate', validateCheckIn)

  app.post('/gyms/:gymId/check-ins', createCheckIn)
}
