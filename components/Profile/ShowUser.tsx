import { RootState } from '@/utils/Redux/Store/Store'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const Showuser = () => {
  const User = useSelector((state: RootState) => state.user)

  return (
    <div className=" flex flex-col ">
      <div className=" flex items-center justify-between">
        <h1>UserName</h1>
        <h1>{User.Name}</h1>
      </div>{' '}
      <div className=" flex items-center justify-between">
        <h1>Job Description</h1>
        <h1>{User.Email}</h1>
      </div>
      <div className=" flex items-center justify-between">
        <h1>Image</h1>
        <Image src={User.imageUrl} width={50} height={50} alt="User Image" />
      </div>
    </div>
  )
}
export default Showuser
