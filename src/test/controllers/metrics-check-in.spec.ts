import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'utils/test/create-and-authenticate'
import { prisma } from 'lib/prisma'

describe('Get metrics check-in e2e test', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to get metrics check-in infos', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym Test',
        latitude: -23.5505,
        longitude: -46.6333,
      }
    })

    await prisma.checkIn.createMany({
      data: [
        {
          userId: user.id,
          gymId: gym.id,
        },
        {
          userId: user.id,
          gymId: gym.id,
        },
      ],
    })

    const response = await request(app.server).get(
      '/check-ins/metrics'
    ).set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.counter).toEqual(2)
  })
})
