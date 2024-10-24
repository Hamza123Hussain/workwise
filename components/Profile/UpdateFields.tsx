'use client'
import { InputValues, UserFetched } from '@/utils/SignUpInterface'
import React, { useState } from 'react'
import { DialogFooter } from '../ui/dialog'
import UpdateInputFields from './UpdateInputFields'
import { RootState } from '@/utils/Redux/Store/Store'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '@/functions/AUTH/UpdateUser'
import { encryptData } from '@/utils/Encryprion'
import { GetUserData } from '@/utils/Redux/Slice/User/UserSlice'
import Loader from '../Loader'
import ImagePreview from './ImagePreview'
const UpdateFields = ({ User }: { User?: UserFetched }) => {
  const [Loading, SetLoading] = useState(false)
  const Dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const UpdateMe = async () => {
    SetLoading(true)
    const Data = await updateUser(inputVal)
    if (Data) {
      const encryptedData = encryptData(Data) // Encrypt data before storing
      localStorage.setItem('UserData', encryptedData)
      Dispatch(GetUserData(Data))
      SetLoading(false)
    }
  }
  const [inputVal, setInputVal] = useState<InputValues>({
    Name: User ? User.Name : user.Name,
    email: User ? User.Email : user.Email,
    password: '',
    Salary: User ? User.Salary.toString() : user.Salary.toString(), // Assuming you want to capture this
    JobDescription: User ? User.Salary : user.JobDescription, // Added JobDescription field
    Image: null,
    JobTitle: User ? User.JobTitle : user.JobTitle,
  })
  if (Loading) {
    return (
      <div className=" flex justify-center items-center">
        <Loader />
      </div>
    )
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null // Get the first file or null
    setInputVal((prev: InputValues) => ({
      ...prev,
      Image: file,
    }))
  }
  return (
    <div className="flex flex-col bg-black p-2 rounded-lg shadow-lg  ">
      <UpdateInputFields inputVal={inputVal} setInputVal={setInputVal} />
      <label htmlFor="imageUpload" className="block mb-1 text-white">
        Upload Image
      </label>
      <input
        type="file"
        id="imageUpload"
        onChange={handleImageChange}
        className="mb-4 p-3 w-full rounded bg-gray-800 text-white focus:outline-none"
      />
      <ImagePreview User={User} />
      <DialogFooter>
        <button
          onClick={() => UpdateMe()}
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 mb-5 rounded-md"
        >
          Save changes
        </button>
      </DialogFooter>
    </div>
  )
}
export default UpdateFields
