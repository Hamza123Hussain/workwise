// showAddress.tsx
import { getAddressFromCoordinates } from '@/functions/Attendance/Checkout/GetExactLocation'
import { LocationCoords } from '@/utils/AttendanceInterface'
import { useEffect, useState } from 'react'
const ShowAddress = ({ location }: { location: LocationCoords }) => {
  const [address, setAddress] = useState<string>('')
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const fetchedAddress = await getAddressFromCoordinates(
          location.latitude, // Latitude first
          location.longitude
        )
        setAddress(fetchedAddress) // Update the address state
      } catch (error) {
        console.error('Failed to fetch address', error)
      }
    }
    fetchAddress() // Invoke the fetchAddress function
  }, [location]) // Add location to the dependency array
  return (
    <div className="text-white">
      <h1>Your Address</h1>
      {<p>Address: {address}</p>} {/* Display the address */}
    </div>
  )
}
export default ShowAddress
