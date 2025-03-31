import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCaseFactory } from 'factories/use-cases/make-authenticate-factory'

export async function session(request:FastifyRequest, reply:FastifyReply) {
  const sessionBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = sessionBodySchema.parse(request.body)

  try {
    const authenticateUseCase= makeAuthenticateUseCaseFactory()
    await authenticateUseCase.execute({
      email,
      password,
    })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(400).send({ message: (error as Error).message })
  }
}
