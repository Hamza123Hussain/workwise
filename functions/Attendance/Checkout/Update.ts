import { LocationCoords } from '@/utils/AttendanceInterface'
import { getUserLocation } from './LocaitionGet'
import toast from 'react-hot-toast'
import { createNewAttendance } from '../NewAttendance'
import { updateAttendance } from '../UpdateAttendance'
export const handleCheckInCheckOut = async (
  userEmail: string,
  currentTime: Date,
  checkinStatus: boolean,
  attendanceId: string | null,
  setAttendanceId: (id: string | null) => void,
  setCheckinStatus: (status: boolean) => void,
  setLocation: (currentLocation: LocationCoords) => void
) => {
  const time = currentTime.toISOString() // Convert to ISO string for uniformity
  try {
    // Get and log the user's location during check-in/out
    const location = await getUserLocation()
    if (!location) {
      toast.error('No location found')
      return // Early exit if no location found
    }
    if (!checkinStatus) {
      // Check-in process
      const newAttendance = await createNewAttendance(
        userEmail,
        time,
        true,
        location
      )
      setAttendanceId(newAttendance.attendance._id)
      setLocation({
        latitude: newAttendance.attendance.latitude,
        longitude: newAttendance.attendance.longitude,
        location: newAttendance.attendance.Location,
      })
      toast.success('You have Checked In')
      setCheckinStatus(true)
    } else {
      // Check-out process
      if (attendanceId) {
        const exitTime = new Date(currentTime)
        if (userEmail === 'aroojyousaf017@gmail.com') {
          exitTime.setHours(exitTime.getHours() + 1) // Increment by 1 hour
        }
        await updateAttendance({
          Email: userEmail,
          id: attendanceId,
          ExitTime: exitTime.toISOString(), // Convert back to ISO string
          CheckInStatus: false,
          location,
        })
        toast.success('You have Checked Out')
        setCheckinStatus(false)
      } else {
        console.error('Attendance ID not found for check-out.')
      }
    }
  } catch (error) {
    console.error('Error during check-in/out:', error)
    toast.error('Failed to retrieve location or update attendance.')
  }
}
