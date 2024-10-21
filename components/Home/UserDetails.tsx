import { handleSignOut } from '@/functions/AUTH/SignOut'
import { ClearUser } from '@/utils/Redux/Slice/User/UserSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import { LogOut } from 'lucide-react'
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
    <div className=" flex items-center gap-10">
      <div className=" flex items-center gap-2 ">
        <Image
          src={user.imageUrl}
          width={30}
          height={30}
          alt="User Image"
          className=" rounded-full"
        />
        <h1 className=" text-xs text-white">{user.Name}</h1>
      </div>
      <LogOut
        size={18}
        onClick={() => Signout()}
        className=" text-white cursor-pointer hover:text-red-600"
      />
      {/* <button
      
        className=" bg-red-600 hover:bg-red-900 text-white px-4 py-2 rounded-lg"
      >
        Signout
      </button> */}
    </div>
  )
}
export default UserDetails
