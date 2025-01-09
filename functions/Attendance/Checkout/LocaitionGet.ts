import { LocationCoords } from '@/utils/Interfaces/AttendanceInterface'

// Function to get the user's location
export const getUserLocation = (): Promise<LocationCoords | null> => {
  return new Promise((resolve, reject) => {
    // Check if the browser supports the Geolocation API
    if (navigator.geolocation) {
      // Request options for high accuracy
      const options = {
        enableHighAccuracy: true, // Request high accuracy
        timeout: 10000, // Timeout after 10 seconds
        maximumAge: 0, // Don't use cached position
      }

      // Request the current position
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords
          console.log('User Location:', { latitude, longitude })
          resolve({ latitude, longitude })
        },
        (error: GeolocationPositionError) => {
          console.error('Error getting location:', error.message)
          reject(error.message)
        },
        options // Pass the options to the getCurrentPosition method
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
      reject('Geolocation is not supported')
    }
  })
}
