import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInsUseCaseFactory } from 'factories/use-cases/check-in/make-validate-check-in-factory'

export async function validateCheckIn (request:FastifyRequest, reply:FastifyReply) {
  const validateCheckInQueryParamSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInQueryParamSchema.parse(request.params)

  try {
    const validadeCheckInUseCase = makeValidateCheckInsUseCaseFactory()
    await validadeCheckInUseCase.execute({
      checkInId
    })

    return reply.status(204).send()
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
