import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeProfileUseCaseFactory } from 'factories/use-cases/make-profile-factory'

export async function profile (request:FastifyRequest, reply:FastifyReply) {
  const profileBodySchema = z.object({
    id: z.string(),
  })

  const { id } = profileBodySchema.parse(request.params)

  try {
    const profileUseCase = makeProfileUseCaseFactory()

    const user = await profileUseCase.execute({ id })

    return reply.status(201).send({ user })
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
