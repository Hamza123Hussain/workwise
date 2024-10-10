import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'

export const getUserSalary = async (Name: string) => {
  try {
    const response = await axios.get(
      `${ApiUrl}Api/Auth/GetUserSalary?Name=${Name} `
    )
    const salary = response.data.Salary // Extracting salary from user data
    return salary
  } catch (error) {
    console.error('Error fetching user salary:', error)
    return null // Or handle the error as needed
  }
}
