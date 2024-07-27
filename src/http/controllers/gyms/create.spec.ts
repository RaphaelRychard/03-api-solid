import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gyms',
        description: 'Some description',
        phone: '659000000',
        latitude: -15.5104082,
        longitude: -56.0340586,
      })

    expect(response.statusCode).toEqual(201)
  })
})
