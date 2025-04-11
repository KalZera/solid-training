import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    workspace: [
      {
        extends: true,
        test: {
          name: 'units-use-cases',
          include: ['src/test/use-cases/**'],
          environment: 'node',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e-controllers',
          include: ['src/test/controllers/**'],
          environment: 'prisma/vitest-enviroment-prisma'
        }
      }
    ],
  }
})
