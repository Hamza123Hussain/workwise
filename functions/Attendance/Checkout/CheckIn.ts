import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

export const CheckIn = async (
  email: string,
  entryTime: string | null,
  checkInStatus: boolean
) => {
  try {
    if (entryTime) {
      const formattedEntryTime = new Date(entryTime)

      const response = await axios.post(
        `${ApiUrl}Api/Attendance/NewAttendace`,
        {
          Email: email,
          EntryTime: formattedEntryTime,
          CheckInStatus: checkInStatus,
        }
      )

      if (response.status === 201) {
        toast.success('YOU HAVE CHECKED IN!!')
        return response.data
      } else {
        alert('⚠️ Something went wrong. Please try again.')
      }
    }
  } catch (error) {
    console.error('Error recording attendance:', error)
    alert(
      '❌ Failed to record attendance. Check your connection or try again later.'
    )
  }
}
