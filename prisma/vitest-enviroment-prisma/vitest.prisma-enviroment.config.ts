import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'

const prisma = new PrismaClient()

function generateDatabaseUrl (schema:string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please privide a DATABASE_URL')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup: async () => {
    const schema = randomUUID()

    const newURLDatabase = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = newURLDatabase

    await execSync('npx prisma migrate deploy')
    // called before all tests with this env are run
    return {
      async teardown () {
        // called after all tests with this env have been run
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)

        await prisma.$disconnect()
      }
    }
  }
}
