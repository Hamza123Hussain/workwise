import React, { useState } from 'react'
import { DialogFooter } from '../ui/dialog'
import { RootState } from '@/utils/Redux/Store/Store'
import { useSelector } from 'react-redux'

const UpdateFields = () => {
  const User = useSelector((state: RootState) => state.user)
  const [Description, SetDescription] = useState(User.JobDescription)
  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label
            htmlFor="jobDescription"
            className="text-right text-purple-500"
          >
            Description
          </label>
          <textarea
            id="jobDescription"
            name="Description"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => SetDescription(e.target.value)}
            defaultValue={Description}
            className="col-span-3 bg-gray-800 text-white border border-purple-500 rounded-md p-2 focus:outline-none focus:border-purple-600"
          />
        </div>
      </div>
      <DialogFooter>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Save changes
        </button>
      </DialogFooter>
    </>
  )
}
export default UpdateFields
