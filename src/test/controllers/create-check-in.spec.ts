import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'utils/test/create-and-authenticate'
import { prisma } from 'lib/prisma'
import { deleteUsers } from 'utils/test/delete-user-to-test'

describe('Create check-in e2e test', () => {
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
    await app.close()
  })
  it('should be able to create check-ins ', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const gym = await prisma.gym.create({
      data: {
        title: 'new Test Gym',
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
  })
  it('should be able to get error on create check-ins ', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const response = await request(app.server).post(
      '/gyms/invalid-gym-id/check-ins'
    ).send({
      latitude: -27.2092052,
      longitude: -49.6401091,
    })
      .set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toEqual(500)
  })
})
