import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  // configure vitest to end-to-end prisma tests
  test: {
    workspace: [
      {
        extends: true,
        test: {
          include: ['src/test/use-cases/**'],
          environment: 'node',
        },
      },
      {
        extends: undefined,
        test: {
          include: ['src/test/controllers/**'],
          environment: 'prisma'
        }
      }
    ],
  }
})
