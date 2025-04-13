import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'utils/test/create-and-authenticate'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Search Gyms e2e test', () => {
  beforeAll(async () => {
    await app.ready()
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server)
      .post('/gyms')
      .send({
        title: 'New test Gym',
        latitude: -23.5505,
        longitude: -46.6333,
      })
      .set('Authorization', `Bearer ${token}`)
  })

  afterEach(async () => {
    await prisma.gym.deleteMany({
      where: {
        title: 'New test2 Gym',
      }
    })
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to get gyms by search', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .send({
        title: 'New test2 Gym',
        description: 'New test2 Gym',
        latitude: -23.5505,
        longitude: -46.6333,
      })
      .set('Authorization', `Bearer ${token}`)
    const response = await request(app.server)
      .get('/gyms')
      .query({
        query: 'test',
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)

    // console.log({ response })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(2)
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'New test Gym',
        }),
        expect.objectContaining({
          title: 'New test2 Gym',
        })
      ])
    )
  })
  it('should be able to get gyms by search one item', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .send({
        title: 'New test2 Gym',
        description: 'New test2 Gym',
        latitude: -23.5505,
        longitude: -46.6333,
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app.server)
      .get('/gyms')
      .query({
        query: 'test2',
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'New test2 Gym',
        })
      ])
    )
  })
})
