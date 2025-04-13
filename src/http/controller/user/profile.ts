import { FastifyReply, FastifyRequest } from 'fastify'
import { makeProfileUseCaseFactory } from 'factories/use-cases/user/make-profile-factory'

export async function profile (request:FastifyRequest, reply:FastifyReply) {
  const { sub: id } = request.user
  try {
    const getUserProfileUseCase = makeProfileUseCaseFactory()

    const { user } = await getUserProfileUseCase.execute({ id })

    return reply.status(200).send({ ...user, password_hash: undefined })
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
