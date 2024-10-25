import { EditTask } from '@/utils/TaskformInterface'
import React from 'react'
const EditTaskBody: React.FC<EditTask> = ({
  task,
  progress,
  setProgress,
  priority,
  setPriority,
  Email,
  description,
  setDescription,
}) => {
  return (
    <>
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-bold">Task Details</h1>
        <h2 className="text-2xl font-bold">{task?.name}</h2>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Progress</h2>
        <select
          value={progress}
          onChange={(e) =>
            setProgress(
              e.target.value as
                | 'TODO'
                | 'IN_PROGRESS'
                | 'DONE'
                | 'Minor_progress'
            )
          }
          className="bg-[#b698ff] text-white border-white border-2 p-2 rounded w-full"
        >
          <option value="TODO">TODO</option>
          <option value="Minor_progress">Minor_progress</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Priority</h2>
        <select
          value={priority}
          onChange={
            (e) =>
              // Allow changing priority only for the specific email
              Email === 'octtoppus1@gmail.com'
                ? setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')
                : null // Prevent changes for other users
          }
          className="bg-[#b698ff] text-white border-white border-2 p-2 rounded w-full"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Description</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-[#b698ff] text-white border-white border-2 p-2 rounded w-full"
        />
      </div>
    </>
  )
}
export default EditTaskBody
