import fastify from 'fastify'
import { register } from 'http/controller/register'

export const app = fastify()

app.post('/users', register)
