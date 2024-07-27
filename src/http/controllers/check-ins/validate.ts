import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'

export async function validate(request: FastifyRequest, replay: FastifyReply) {
  const validateCheckInParmsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParmsSchema.parse(request.params)

  const validateCheckInsUseCase = makeValidateCheckInUseCase()

  await validateCheckInsUseCase.execute({
    checkInId,
  })

  return replay.status(204).send()
}
