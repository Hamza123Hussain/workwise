import toast from 'react-hot-toast'
import { createNewAttendance } from '../NewAttendance'
import { updateAttendance } from '../UpdateAttendance'
export const handleCheckInCheckOut = async (
  userEmail: string,
  currentTime: Date,
  checkinStatus: boolean,
  attendanceId: string | null,
  setAttendanceId: (id: string | null) => void,
  setCheckinStatus: (status: boolean) => void
) => {
  const time = currentTime.toISOString() // Convert to ISO string for uniformity
  try {
    if (!checkinStatus) {
      // Check-in process
      const newAttendance = await createNewAttendance(
        userEmail,
        time,
        checkinStatus
      )
      setAttendanceId(newAttendance.attendance._id)

      toast.success('You have Checked In')
      setCheckinStatus(true)
    } else {
      // Check-out process
      if (attendanceId) {
        const exitTime = new Date(currentTime)
        await updateAttendance({
          Email: userEmail,
          id: attendanceId,
          ExitTime: exitTime.toISOString(), // Convert back to ISO string
          CheckInStatus: checkinStatus,
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
