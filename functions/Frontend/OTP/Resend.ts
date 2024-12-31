import { ApiUrl } from '@/utils/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'

export const handleResendOtp = async (
  setIsSending: (send: boolean) => void,
  Email: string
) => {
  setIsSending(true)
  try {
    console.log(Email)
    // Sending the request using Axios
    await axios.post(`${ApiUrl}Api/Otp/SendOtp`, {
      email: Email,
    })
    toast.success('OTP sent successfully to your email.')
  } catch (err) {
    console.error(err)
    toast.error('Failed to resend OTP. Please try again.')
  } finally {
    setIsSending(false)
  }
}
