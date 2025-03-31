import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCaseFactory } from 'factories/use-cases/make-register-factory'

export async function register(request:FastifyRequest, reply:FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCaseFactory()
    await registerUseCase.execute({
      name,
      email,
      password,
    })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
