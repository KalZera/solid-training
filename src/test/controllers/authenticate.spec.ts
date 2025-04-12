import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'app'
import request from 'supertest'

describe('Authenticate e2e test', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate', async () => {
    await request(app.server).post(
      '/users'
    ).send({
      name: 'John Doe',
      email: 'Johndoe@email.com',
      password: '123456'
    })

    const response = await request(app.server).post(
      '/session'
    ).send({
      email: 'Johndoe@email.com',
      password: '123456'
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.body).toHaveProperty('token')
  })
})
