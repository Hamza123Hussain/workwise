// functions/Attendance/attendanceActions.ts
import { createNewAttendance } from '@/functions/Attendance/NewAttendance'
import { updateAttendance } from '@/functions/Attendance/UpdateAttendance'
import toast from 'react-hot-toast'
export const handleCheckInCheckOut = async (
  userEmail: string,
  currentTime: Date,
  checkinStatus: boolean,
  attendanceId: string | null,
  setAttendanceId: (id: string | null) => void,
  setCheckinStatus: (status: boolean) => void
) => {
  const time = currentTime.toISOString()
  if (!checkinStatus) {
    try {
      const newAttendance = await createNewAttendance({
        Email: userEmail,
        EntryTime: time,
        CheckInStatus: true,
      })
      setAttendanceId(newAttendance.attendance._id)
      toast.success('You have Checked In')
      setCheckinStatus(true)
    } catch (error) {
      console.error('Error during check-in:', error)
    }
  } else {
    if (attendanceId) {
      try {
        await updateAttendance({
          Email: userEmail,
          id: attendanceId,
          ExitTime: time,
          CheckInStatus: false,
        })
        toast.success('You have Checked OUT')
        setCheckinStatus(false)
      } catch (error) {
        console.error('Error during check-out:', error)
      }
    } else {
      console.error('Attendance ID not found for check-out.')
    }
  }
}
