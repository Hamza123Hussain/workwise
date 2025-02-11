import axios from 'axios'

export const createNewAttendance = async (
  Email: string,
  EntryTime: string,
  CheckInStatus: boolean
) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/Api/Attendance/NewAttendace`,
      { Email, EntryTime, CheckInStatus }
    )
    console.log('New Attendance Created Successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error creating new attendance:', error)
    throw error
  }
}
