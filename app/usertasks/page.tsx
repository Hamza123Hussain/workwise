'use client'
import UserSelection from '@/components/Layout/UserSelection'
import TaskCard2 from '@/components/Tasks/TaskCard2'
import { RootState } from '@/utils/Redux/Store/Store'
import { TaskFetch } from '@/utils/TaskformInterface'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchUserTasks } from '@/functions/Frontend/UserTasks' // Ensure correct import
import Empty_Task_Test from '@/components/Tasks/Empty_Task_Test'
import { UserFetched } from '@/utils/SignUpInterface'
import { Allusers } from '@/functions/AUTH/Allusers'
import Loader from '@/components/Loader'
const UserTasks = () => {
  const [Users, SetUserFetched] = useState<UserFetched[]>([])
  const [loading, setLoading] = useState(true)
  const [allTasks, setTasks] = useState<TaskFetch[]>([])
  const user = useSelector((state: RootState) => state.user)
  const selectedUser = useSelector((state: RootState) => state.Select)
  const Getusers = async () => {
    const Data = await Allusers(user.Email)
    if (Data) {
      SetUserFetched(Data)
      setLoading(false)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const userName =
        user.Email === 'octtoppus1@gmail.com' ? selectedUser : user.Name
      const tasks = await fetchUserTasks(userName, user.Email, setLoading)
      setTasks(tasks) // Set the fetched tasks
    }
    fetchData() // Call the fetchData function
    Getusers()

    return () => {
      fetchData()
    }
  }, [selectedUser, user.Email, user.Name])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    )
  }
  return (
    <div className="p-6 rounded-lg shadow-md my-10">
      {user.Email !== 'octtoppus1@gmail.com' && (
        <h2 className="font-semibold text-2xl text-purple-500 mb-4">
          Tasks of {user.Name}
        </h2>
      )}
      <UserSelection type={'Task'} Users={Users} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {allTasks.length > 0 && !loading ? (
          allTasks.map((task) => (
            <TaskCard2 key={task.createdAt} TaskDetail={task} />
          ))
        ) : (
          <Empty_Task_Test />
        )}
      </div>
    </div>
  )
}
export default UserTasks
