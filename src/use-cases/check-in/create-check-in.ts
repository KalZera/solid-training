import { CheckIn } from '@prisma/client'
import { CheckInRepository } from 'repositories/check-ins/check-in-repository'
import { GymRepository } from 'repositories/gyms/gym-repository'
import { ResourceNotFoundError } from 'use-cases/errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from 'utils/get-distance-between-coordinates'

interface checkiInUseCaseInput {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface checkInUseCaseOutput {
  checkIn: CheckIn;
}

const MAX_DISTANCE_IN_METERS = 100
const METERS_IN_KM = 1000

export class CheckInUseCase {
  constructor (
    private checkinsRepository: CheckInRepository,
    private gymsRepository: GymRepository
  ) {}

  async execute ({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: checkiInUseCaseInput): Promise<checkInUseCaseOutput> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    // calculate distance between user and gym
    const distanceInKm = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    )

    // check if distance is greater than 100 meters
    const distanceInMeters = distanceInKm * METERS_IN_KM

    if (distanceInMeters > MAX_DISTANCE_IN_METERS) {
      throw new Error('User is too far from the gym')
    }

    const checkInOnSameDay = await this.checkinsRepository.findByUserIdOnDate(
      userId,
      new Date()
    )

    if (checkInOnSameDay) {
      throw new Error('User already checked in today')
    }

    const checkIn = await this.checkinsRepository.create({
      userId,
      gymId,
    })

    return {
      checkIn,
    }
  }
}
