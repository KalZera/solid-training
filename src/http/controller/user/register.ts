import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUseCaseFactory } from 'factories/use-cases/user/make-register-factory'

export async function register (request:FastifyRequest, reply:FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'MEMBER']).optional().default('MEMBER'),
  })

  const { name, email, password, role } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCaseFactory()
    await registerUseCase.execute({
      name,
      email,
      password,
      role,
    })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send({ message: (error as Error).message })
  }
}
