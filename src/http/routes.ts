import type { FastifyInstance } from "fastify";
import { register } from "./controller/register";
import { session } from "./controller/sessions";

export async function routes(app:FastifyInstance){
  app.post('/users', register)
  app.post('/authenticate', session)
} 