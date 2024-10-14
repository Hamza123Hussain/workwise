import { LocationCoords } from '@/utils/AttendanceInterface'

// Function to get the user's location
export const getUserLocation = (): Promise<LocationCoords | null> => {
  // Return a new Promise to handle asynchronous geolocation retrieval
  return new Promise((resolve, reject) => {
    // Check if the browser supports the Geolocation API
    if (navigator.geolocation) {
      // If supported, request the current position
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        (position: GeolocationPosition) => {
          // Destructure latitude and longitude from the position's coords
          const { latitude, longitude } = position.coords
          // Log the user's location to the console
          console.log('User Location:', { latitude, longitude })
          // Resolve the promise with the location coordinates
          resolve({ latitude, longitude })
        },
        // Error callback function
        (error: GeolocationPositionError) => {
          // Log the error message to the console
          console.error('Error getting location:', error.message)
          // Reject the promise with the error message
          reject(error.message)
        }
      )
    } else {
      // If geolocation is not supported, log an error message
      console.error('Geolocation is not supported by this browser.')
      // Reject the promise with a message indicating lack of support
      reject('Geolocation is not supported')
    }
  })
}
