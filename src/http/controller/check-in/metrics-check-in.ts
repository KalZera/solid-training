import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetCountCheckInsUseCaseFactory } from 'factories/use-cases/check-in/make-get-count-check-ins-factory'

export async function metricsCheckIn (request:FastifyRequest, reply:FastifyReply) {
  try {
    const getCheckInCountUseCase = makeGetCountCheckInsUseCaseFactory()
    const { counter } = await getCheckInCountUseCase.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({ counter })
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
