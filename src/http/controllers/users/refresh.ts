import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({
    onlyCookie: true,
  })

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true, // cookie vai ser imcripitado pelo https e o front não sonsegue ler
      sameSite: true, // só vai ser acessesivel dentro do mesmo site
      httpOnly: true, // que só vai ser acessado pelo backend da aplicação
    })
    .status(200)
    .send({
      token,
    })
}
