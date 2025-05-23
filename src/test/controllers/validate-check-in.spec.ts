import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'utils/test/create-and-authenticate'
import { prisma } from 'lib/prisma'
import { deleteUsers } from 'utils/test/delete-user-to-test'

describe('Validate CheckIn e2e test', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await prisma.checkIn.deleteMany({
      where: {
        user: {
          email: 'Johndoe@example.com',
        }
      }
    })
    await deleteUsers()
  })

  afterAll(async () => {
    await deleteUsers()
    await app.close()
  })
  it('should be able to validate', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')
    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Gym Test',
        latitude: -23.5505,
        longitude: -46.6333,
      },
    })

    let checkIn = await prisma.checkIn.create({
      data: {
        userId: user.id,
        gymId: gym.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findFirstOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validatedAt).toEqual(expect.any(Date))
  })
})
