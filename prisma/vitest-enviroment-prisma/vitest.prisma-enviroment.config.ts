import type { Environment } from 'vitest/environments'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  // optional - only if you support "experimental-vm" pool
  setup () {
    console.log('setup prisma environment')
    // called before all tests with this env are run
    return {
      teardown () {
        // called after all tests with this env have been run
      }
    }
  }
}
