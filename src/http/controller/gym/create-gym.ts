import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGymUseCaseFactory } from 'factories/use-cases/gym/make-gym-factory'

export async function createGym (request:FastifyRequest, reply:FastifyReply) {
  const gymBodySchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    phone: z.string().optional(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  const { description, title, latitude, longitude, phone } =
    gymBodySchema.parse(request.body)

  try {
    const gymUseCase = makeGymUseCaseFactory()
    await gymUseCase.execute({
      title,
      description: description || null,
      phone: phone || null,
      latitude,
      longitude,
    })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
