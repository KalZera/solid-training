import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from 'app'
import request from 'supertest'
import { createAndAuthenticateUser } from 'utils/test/create-and-authenticate'

describe('Profile e2e test', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to get profile infos', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const response = await request(app.server).get(
      '/profile'
    ).set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'Johndoe@example.com'
      })
    )
    expect(response.body).not.toHaveProperty('password_hash')
  })
})
