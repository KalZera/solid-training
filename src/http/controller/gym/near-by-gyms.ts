import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchNearByGymsUseCaseFactory } from 'factories/use-cases/gym/make-fetch-near-by-gyms-factory'

export async function nearByGym (request:FastifyRequest, reply:FastifyReply) {
  const nearByGymsQueryParamSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { page, userLatitude, userLongitude } =
    nearByGymsQueryParamSchema.parse(request.query)

  try {
    const nearByGymsUseCase = makeFetchNearByGymsUseCaseFactory()
    const { gyms } = await nearByGymsUseCase.execute({
      page,
      userLatitude,
      userLongitude,
    })

    return reply.status(200).send({ gyms })
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
