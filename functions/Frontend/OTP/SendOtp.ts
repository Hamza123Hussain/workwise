import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'
export const SendOtp = async (Email: string) => {
  try {
    console.log(Email)
    // Sending the request using Axios
    await axios.post(`${ApiUrl}Api/Otp/SendOtp`, {
      email: Email,
    })
    toast.success('OTP sent successfully to your email.')
    return true
  } catch (err) {
    console.error(err)
    toast.error('Failed to resend OTP. Please try again.')
  } finally {
  }
}
