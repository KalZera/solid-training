import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCaseFactory } from 'factories/use-cases/gym/make-search-gyms-factory'

export async function searchGym (request:FastifyRequest, reply:FastifyReply) {
  const searchGymsQueryParamSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    query: z.string(),
  })

  const { query, page } =
    searchGymsQueryParamSchema.parse(request.query)

  try {
    const searchGymsUseCase = makeSearchGymsUseCaseFactory()
    const { gyms } = await searchGymsUseCase.execute({
      page,
      query
    })

    return reply.status(200).send({ gyms })
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
