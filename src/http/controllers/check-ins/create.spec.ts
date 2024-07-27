import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gyms',
        latitude: -15.5104082,
        longitude: -56.0340586,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -15.5104082,
        longitude: -56.0340586,
      })

    expect(response.statusCode).toEqual(201)
  })
})
