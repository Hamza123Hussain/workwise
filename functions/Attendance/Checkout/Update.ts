import { createNewAttendance } from '@/functions/Attendance/NewAttendance'
import { updateAttendance } from '@/functions/Attendance/UpdateAttendance'
import toast from 'react-hot-toast'
import { getUserLocation } from './LocaitionGet'

export const handleCheckInCheckOut = async (
  userEmail: string,
  currentTime: Date,
  checkinStatus: boolean,
  attendanceId: string | null,
  setAttendanceId: (id: string | null) => void,
  setCheckinStatus: (status: boolean) => void
) => {
  const time = currentTime.toISOString()

  try {
    // Get and log the user's location during check-in/out
    const location = await getUserLocation() // Await the promise
    if (!location) {
      toast.error('NO LOCATION FOUND')
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
      toast.success('You have Checked In')
      setCheckinStatus(true)
    } else {
      // Check-out process
      if (attendanceId) {
        await updateAttendance({
          Email: userEmail,
          id: attendanceId,
          ExitTime: time,
          CheckInStatus: false,
        })
        toast.success('You have Checked OUT')
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
