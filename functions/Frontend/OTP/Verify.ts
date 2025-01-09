import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation' // Import useRouter from next/navigation
import { AppDispatch } from '@/utils/Redux/Store/Store'
import { UpdateCredentials } from '@/utils/Redux/Slice/Flag_Slice/Flag_Slice'
import CryptoJS from 'crypto-js' // Import crypto-js for encryption

export const handleVerifyOtp = async (
  setIsVerifying: (verify: boolean) => void,
  Email: string,
  otp: string,
  router: ReturnType<typeof useRouter>, // Correct typing for router in next/navigation
  dispatch: AppDispatch
) => {
  setIsVerifying(true)
  try {
    const response = await axios.post(`${ApiUrl}Api/Otp/VerifyOtp`, {
      email: Email,
      otp,
    })
    const data = response.data
    if (data.success) {
      // Encrypt the flag value (true) and store it in local storage
      const encryptedFlag = CryptoJS.AES.encrypt(
        JSON.stringify(true), // Convert boolean to string before encryption
        process.env.NEXT_PUBLIC_SECRET_KEY as string
      ).toString()

      localStorage.setItem('encryptedFlag', encryptedFlag)

      // Update credentials in Redux
      dispatch(UpdateCredentials(true))

      // Navigate to the home page
      router.push('/')
    } else {
      toast.error('Invalid OTP. Please try again.')
    }
  } catch (err) {
    console.error(err)
    toast.error('An error occurred during OTP verification.')
  } finally {
    setIsVerifying(false)
  }
}
