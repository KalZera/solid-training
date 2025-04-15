import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserCheckInsUseCaseFactory } from 'factories/use-cases/check-in/make-fetch-user-check-ins-factory'
import { z } from 'zod'

export async function getCheckIn (request:FastifyRequest, reply:FastifyReply) {
  const checkInByUserQueryParamSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInByUserQueryParamSchema.parse(request.query)

  try {
    const UserCheckInsUseCase = makeFetchUserCheckInsUseCaseFactory()
    const { checkIns } = await UserCheckInsUseCase.execute({
      userId: request.user.sub,
      page
    })

    return reply.status(200).send({ checkIns })
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
