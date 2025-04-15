import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCaseFactory } from 'factories/use-cases/session/make-authenticate-factory'

export async function session (request: FastifyRequest, reply: FastifyReply) {
  const sessionBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = sessionBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCaseFactory()
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      }
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (error) {
    return reply.status(400).send({ message: (error as Error).message })
  }
}
