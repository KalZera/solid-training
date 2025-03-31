import type { FastifyInstance } from "fastify";
import { register } from "./controller/register";
import { session } from "./controller/sessions";
import { profile } from "./controller/profile";

export async function routes(app:FastifyInstance){
  app.post('/users', register)
  app.post('/session', session)
  app.get('/profile/:id', profile)
} 