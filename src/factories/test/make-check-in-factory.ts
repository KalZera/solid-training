import { InMemoryGymRepository } from 'repositories/gyms/in-memory-gym-repository'
import { InMemoryCheckInRepository } from 'repositories/check-ins/in-memory-check-in-repository'
import { CheckInUseCase } from 'use-cases/check-in'

export function makeCheckInUseCaseFactory () {
  const gymRepository = new InMemoryGymRepository()
  const checkInRepository = new InMemoryCheckInRepository()
  const checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository)

  return checkInUseCase
}
