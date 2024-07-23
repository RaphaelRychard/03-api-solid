import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

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
