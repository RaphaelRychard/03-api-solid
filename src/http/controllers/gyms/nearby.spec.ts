import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { app } from '@/app'

describe('Nearby (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able tolist nearby gyms', async () => {
    const { token } = await createAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '659000000',
        latitude: -15.5104082,
        longitude: -56.0340586,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'Some description',
        phone: '659000000',
        latitude: -13.8522464,
        longitude: -73.375774,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -15.5104082,
        longitude: -56.0340586,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ])
  })
})
