import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-matrics-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(request: FastifyRequest, replay: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return replay.status(201).send({
    checkInsCount,
  })
}
