import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserCheckInsUseCaseFactory } from 'factories/use-cases/check-in/make-fetch-user-check-ins-factory'

export async function getCheckIn (request:FastifyRequest, reply:FastifyReply) {
  try {
    const UserCheckInsUseCase = makeFetchUserCheckInsUseCaseFactory()
    const { checkIns } = await UserCheckInsUseCase.execute({
      userId: request.user.sub,
      page: 1,
    })

    return reply.status(200).send({ checkIns })
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
