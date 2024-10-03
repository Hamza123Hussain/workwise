'use client'
import { InputValues } from '@/utils/SignUpInterface'
import React, { useState } from 'react'
import { DialogFooter } from '../ui/dialog'
import UpdateInputFields from './UpdateInputFields'
import { RootState } from '@/utils/Redux/Store/Store'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '@/functions/AUTH/UpdateUser'
import { encryptData } from '@/utils/Encryprion'
import { GetUserData } from '@/utils/Redux/Slice/User/UserSlice'
import Loader from '../Loader'
const UpdateFields = () => {
  const [Loading, SetLoading] = useState(false)
  const Dispatch = useDispatch()
  const User = useSelector((state: RootState) => state.user)
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
    Name: User.Name,
    email: User.Email,
    password: '',
    Salary: User.Salary.toString(), // Assuming you want to capture this
    JobDescription: User.JobDescription, // Added JobDescription field
    Image: null,
    JobTitle: User.JobTitle,
  })
  if (Loading) {
    return (
      <div className=" flex justify-center items-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="flex flex-col bg-black p-6 rounded-lg shadow-lg w-full max-w-md my-5">
      <UpdateInputFields inputVal={inputVal} setInputVal={setInputVal} />
      <DialogFooter>
        <button
          onClick={() => UpdateMe()}
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Save changes
        </button>
      </DialogFooter>
    </div>
  )
}
export default UpdateFields
