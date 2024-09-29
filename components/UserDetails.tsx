import { fetchUserData } from '@/functions/AUTH/GetUser'
import { handleSignOut } from '@/functions/AUTH/SignOut'
import { ClearUser } from '@/utils/Redux/Slice/User/UserSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const UserDetails = () => {
  const Dispatch = useDispatch()
  const user = useSelector((State: RootState) => State.user)
  const storedEmail = localStorage.getItem('UserEmail')
  const userEmail = storedEmail ? JSON.parse(storedEmail) : null
  const Signout = async () => {
    const SignoutDone = await handleSignOut()
    if (SignoutDone) Dispatch(ClearUser())
  }
  const FetchUserData = async () => {
    const Data = await fetchUserData(userEmail)
    if (Data) {
      console.log('USER DATA FETCHES', Data)
    }
  }
  useEffect(() => {
    if (userEmail) {
      FetchUserData()
    }
  }, [userEmail])
  return (
    <div className=" flex flex-col items-center gap-2">
      <h1 className=" text-xl text-white">{user.Name}</h1>
      <button
        onClick={() => Signout()}
        className=" bg-red-600 hover:bg-red-900 text-white px-4 py-2 rounded-lg"
      >
        Signout
      </button>
    </div>
  )
}
export default UserDetails
