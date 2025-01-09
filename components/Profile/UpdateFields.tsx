'use client'
import { InputValues, UserFetched } from '@/utils/Interfaces/SignUpInterface'
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
      const encryptedData = encryptData(Data)
      localStorage.setItem('UserData', encryptedData)
      Dispatch(GetUserData(Data))
      SetLoading(false)
    }
  }
  const [inputVal, setInputVal] = useState<InputValues>({
    Name: User ? User.Name : user.Name,
    email: User ? User.Email : user.Email,
    password: '',
    Salary: User ? User.Salary.toString() : user.Salary.toString(),
    JobDescription: user.JobDescription,
    Image: null,
    JobTitle: User ? User.JobTitle : user.JobTitle,
    Role: User ? User.Role : user.Role,
  })
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setInputVal((prev: InputValues) => ({
      ...prev,
      Image: file,
    }))
  }
  if (Loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto space-y-6">
      <UpdateInputFields inputVal={inputVal} setInputVal={setInputVal} />
      <label htmlFor="imageUpload" className="block text-gray-700 mb-2">
        Upload Image
      </label>
      <input
        type="file"
        id="imageUpload"
        onChange={handleImageChange}
        className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
      />
      <ImagePreview User={User} />
      <DialogFooter>
        <button
          onClick={UpdateMe}
          className="w-full sm:w-auto bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Save Changes
        </button>
      </DialogFooter>
    </div>
  )
}
export default UpdateFields
