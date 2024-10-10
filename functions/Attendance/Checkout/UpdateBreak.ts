import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

export const updateBreak = async (
  userEmail: string,
  attendanceId: string,
  breakDuration: number,
  onBreak: boolean
) => {
  try {
    const response = await axios.post(`${ApiUrl}Api/Attendance/Updatebreak`, {
      Email: userEmail,
      id: attendanceId,
      breakDuration: breakDuration,
      onBreak: onBreak,
    })

    if (response.status === 200) {
      toast.success('Attendance updated successfully')
      console.log('Updated attendance:', response.data.attendance)
      return response.data.attendance
    }
  } catch (error) {
    console.error('Error updating break:', error)
    toast.error('Failed to update attendance')
    return null
  }
}
