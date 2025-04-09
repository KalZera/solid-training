import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeProfileUseCaseFactory } from 'factories/use-cases/user/make-profile-factory'

export async function profile (request:FastifyRequest, reply:FastifyReply) {
  const profileBodySchema = z.object({
    id: z.string(),
  })

  const { id } = profileBodySchema.parse(request.params)

  try {
    const getUserProfileUseCase = makeProfileUseCaseFactory()

    const user = await getUserProfileUseCase.execute({ id })

    return reply.status(201).send({ user })
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
