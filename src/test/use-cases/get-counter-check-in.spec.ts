import { InMemoryCheckInRepository } from 'repositories/check-ins/in-memory-check-in-repository'
import { GetCounterCheckInUseCase } from 'use-cases/check-in'
import { expect, describe, it, beforeEach } from 'vitest'

// set variables to use in tests
let checkInRepository: InMemoryCheckInRepository
let sut: GetCounterCheckInUseCase
describe('Get Counter CheckIn use Case', () => {
  beforeEach(() => {
    // Clear the in-memory user repository before each test
    checkInRepository = new InMemoryCheckInRepository()
    sut = new GetCounterCheckInUseCase(checkInRepository)
    checkInRepository.clear()
  })
  it('should be able to get the quantity of check-ins ', async () => {
    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })
    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-2',
    })

    const { counter } = await sut.execute({ userId: 'user-1' })

    expect(counter).toEqual(2)
    expect(counter).not.toBeNull()
  })
  it('should be able to get zero counter with other users', async () => {
    await checkInRepository.create({
      userId: 'user-1',
      gymId: 'gym-1',
    })

    const { counter } = await sut.execute({ userId: 'user-2' })
    expect(counter).toEqual(0)
  })

  it('should to get the number of quantity check-ins', async () => {
    for (let i = 0; i < 10; i++) {
      await checkInRepository.create({
        userId: 'user-1',
        gymId: `gym-${i}`,
      })
    }

    const { counter } = await sut.execute({ userId: 'user-1' })
    expect(counter).toEqual(10)
  })
})
