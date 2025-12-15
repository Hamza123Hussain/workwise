import { ClearUser } from '@/utils/Redux/Slice/User/UserSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import { LogOut } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ShowUser = () => {
  const Dispatch = useDispatch()
  const User = useSelector((state: RootState) => state.user)
  return (
    <div className=" border-[#ECECEE] border  rounded-lg p-1 px-3 gap-10 flex items-center ">
      <div className=" flex items-center gap-2">
        <img
          alt="User Image"
          width={40}
          height={40}
          src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
        />
        <h6 className=" uppercase">{User.Name}</h6>
      </div>
      <LogOut
        onClick={() => Dispatch(ClearUser())}
        className=" cursor-pointer text-[#949494]"
      />
    </div>
  )
}

export default ShowUser
