import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInsUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, replay: FastifyReply) {
  const createCheckInParmsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createChckInBodySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParmsSchema.parse(request.params)
  const { latitude, longitude } = createChckInBodySchema.parse(request.body)

  const createGymUseCase = makeCheckInsUseCase()

  await createGymUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return replay.status(201).send()
}
