import { RootState } from '@/utils/Redux/Store/Store'
import { UserFetched } from '@/utils/Interfaces/SignUpInterface'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'
const ImagePreview = ({ User }: { User?: UserFetched }) => {
  const user = useSelector((state: RootState) => state.user)
  return (
    <div className="flex items-center justify-normal gap-10 mb-4">
      {' '}
      <h1 className=" text-2xl ">Image Preview</h1>
      <Image
        src={User ? User.imageUrl : user.imageUrl}
        alt={User ? User.Name : user.Name}
        width={50}
        height={50}
        className=" rounded-full"
      />
    </div>
  )
}
export default ImagePreview
