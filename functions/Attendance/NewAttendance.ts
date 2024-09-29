import axios from 'axios'

interface NewAttendanceData {
  Email: string
  EntryTime: string
}

export const createNewAttendance = async (data: NewAttendanceData) => {
  try {
    const response = await axios.post(
      'http://localhost:8000/Api/Attendance/NewAttendace',
      data
    )
    console.log('New Attendance Created Successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error creating new attendance:', error)
    throw error
  }
}
