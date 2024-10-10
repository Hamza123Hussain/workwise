import React from 'react'
import { useRouter } from 'next/navigation'
import { TaskFetch } from '@/utils/TaskformInterface'
import { DeleteTask } from '@/functions/Task/DeleteTask'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import toast from 'react-hot-toast'
const Action_Buttons = ({ TaskDetail }: { TaskDetail: TaskFetch }) => {
  const User = useSelector((state: RootState) => state.user)
  const TaskDelete = async () => {
    try {
      const Delete_Task = await DeleteTask(User.Email, TaskDetail._id)
      if (Delete_Task) {
        toast.success('Task Has Been Deleted')
        window.location.reload()
      }
    } catch (error) {
      console.log(`Unable to Delete TaSK ${error}`)
    }
  }
  const Router = useRouter()
  const isDueDatePast =
    new Date(TaskDetail.dueDate) < new Date(new Date().setHours(0, 0, 0, 0))
  return (
    <div className="flex justify-end flex-col sm:flex-row items-center sm:gap-5 gap-2 my-5">
      {' '}
      <button
        onClick={() =>
          !isDueDatePast && Router.push(`/edittask/${TaskDetail._id}`)
        } // Only navigate if the due date is not past
        className={`px-4 py-2 rounded-lg shadow transition-all duration-200 ease-in-out 
                  ${
                    isDueDatePast
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-black text-purple-200 hover:bg-purple-700'
                  }`}
        disabled={isDueDatePast} // Disable button if the due date is past
      >
        Edit Task
      </button>{' '}
      <button
        onClick={() => !isDueDatePast && TaskDelete()} // Only navigate if the due date is not past
        className={`px-4 py-2 rounded-lg shadow transition-all duration-200 ease-in-out 
                  ${
                    isDueDatePast
                      ? 'bg-red-400 text-gray-300 cursor-not-allowed'
                      : 'bg-red-900 text-purple-200 hover:bg-red-700'
                  }`}
        disabled={isDueDatePast} // Disable button if the due date is past
      >
        Delete Task
      </button>
    </div>
  )
}
export default Action_Buttons
