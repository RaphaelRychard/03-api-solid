import { FastifyInstance } from 'fastify'

import { verifyJWT } from '../../middlewares/verify-jwt'

import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /**
   * JWT: JSON Web Token
   * Usuário faz login, envia e-mail/senha, o back-end cria um token ÚNICO, não-modificavek e STATELESS
   * Statekess: Não armazenado em nenhuma estrutura de persistência de dados (banco de dados)
   * Back-end: Quando vai criar o token ele usa uma PALAVRA-CHAVE (string)
   * Palavra-chave: hsakjldfgyu2cvweoiuyhbr39813o1inhad18923y1ghbgas98dnd18129318ugq8dhba
   * E-mail/senha -> header.payload.sign
   *
   * Logni => JWT
   * JWT => Todas requisições dali para frente
   * Header (cabeçalhho): Authorization Bearer JWT
   */

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
