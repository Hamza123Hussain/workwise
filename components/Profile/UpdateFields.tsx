'use client'
import { InputValues } from '@/utils/SignUpInterface'
import React, { useState } from 'react'
import { DialogFooter } from '../ui/dialog'
import UpdateInputFields from './UpdateInputFields'
import { RootState } from '@/utils/Redux/Store/Store'
import { useSelector } from 'react-redux'
const UpdateFields = () => {
  const User = useSelector((state: RootState) => state.user)
  const [inputVal, setInputVal] = useState<InputValues>({
    Name: User.Name,
    email: '',
    password: '',
    Salary: User.Salary.toString(), // Assuming you want to capture this
    JobDescription: User.JobDescription, // Added JobDescription field
    Image: null,
    JobTitle: User.JobTitle,
  })
  return (
    <div className="flex flex-col bg-black p-6 rounded-lg shadow-lg w-full max-w-md my-5">
      <h2 className="text-2xl font-semibold text-purple-500 mb-6 text-center">
        Update User Profile
      </h2>
      <UpdateInputFields inputVal={inputVal} setInputVal={setInputVal} />
      <DialogFooter>
        <button
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
