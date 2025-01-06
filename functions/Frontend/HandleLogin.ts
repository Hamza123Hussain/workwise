import { encryptData } from '@/utils/Encryprion'
import { loginUser } from '../AUTH/LoginUser'
import { handleSignOut } from '../AUTH/SignOut'
import { AppDispatch } from '@/utils/Redux/Store/Store'
import { ClearUser, GetUserData } from '@/utils/Redux/Slice/User/UserSlice'
import { useRouter } from 'next/navigation'
import { SendOtp } from './OTP/SendOtp'
export const handleLoginClick = async (
  email: string,
  password: string,
  dispatch: AppDispatch,
  router: ReturnType<typeof useRouter> // Adjusted type to use ReturnType of useRouter
): Promise<void> => {
  try {
    const data = await loginUser(email, password)
    if (data) {
      const encryptedData = encryptData(data)
      localStorage.setItem('UserData', encryptedData)
      dispatch(GetUserData(data))
      const OtpSent = await SendOtp(email)
      if (OtpSent) {
        router.push('/otp') // Use router parameter
      }
      scheduleSignout(dispatch) // Pass dispatch to scheduleSignout
    } else {
      console.error('Login failed')
    }
  } catch (error) {
    console.error('Error during login:', error)
  }
}

const scheduleSignout = (dispatch: AppDispatch): void => {
  const signoutTimeout = 7 * 60 * 60 * 1000 // 7 hours in milliseconds

  setTimeout(async () => {
    try {
      const SignoutDone = await handleSignOut()

      if (SignoutDone) {
        dispatch(ClearUser())
        localStorage.removeItem('UserData')
      }
    } catch (error) {
      console.error('Error during signout:', error)
    }
  }, signoutTimeout)
}
