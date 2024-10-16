import { handleSignOut } from '@/functions/AUTH/SignOut'
import { ClearUser } from '@/utils/Redux/Slice/User/UserSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const UserDetails = () => {
  const Dispatch = useDispatch()
  const user = useSelector((State: RootState) => State.user)
  const Signout = async () => {
    localStorage.removeItem('UserData')
    const SignoutDone = await handleSignOut()
    if (SignoutDone) Dispatch(ClearUser())
  }
  return (
    <div className=" flex items-center flex-col gap-2 justify-center">
      <div className=" flex items-center gap-2 ">
        <Image
          src={user.imageUrl}
          width={50}
          height={50}
          alt="User Image"
          className=" rounded-full"
        />
        <h1 className=" text-sm text-white">{user.Name}</h1>
      </div>
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
