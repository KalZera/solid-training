import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'utils/test/create-and-authenticate'
import { deleteUsers } from 'utils/test/delete-user-to-test'

describe('Create gym e2e test', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterEach(async () => {
    await deleteUsers()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create gyms ', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')
    const response = await request(app.server).post(
      '/gyms'
    ).send({
      title: 'New Gym',
      description: 'New Gym Description',
      phone: '11999999999',
      latitude: -23.5505,
      longitude: -46.6333,
    })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(201)
  })
  it('should be able to get error on create gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')
    const response = await request(app.server).post(
      '/gyms'
    ).send({
      title: 'New Gym Error',
    })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(500)
  })
})
