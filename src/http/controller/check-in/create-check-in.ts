import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCaseFactory } from 'factories/use-cases/check-in/make-check-in-factory'

export async function createCheckIn (request:FastifyRequest, reply:FastifyReply) {
  const checkInQueryParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const checkInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = checkInQueryParamsSchema.parse(request.body)
  const { latitude, longitude } = checkInBodySchema.parse(request.body)

  try {
    const { sub: id } = request.user
    const checkInUseCase = makeCheckInUseCaseFactory()
    await checkInUseCase.execute({
      gymId,
      userId: id,
      userLatitude: latitude,
      userLongitude: longitude
    })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
