// 'use client'
// import MainTable from '@/components/Attendance/MainTable'
// import TableHead from '@/components/Layout/TableHead'
// import Loader from '@/components/Loader'
// import { AllTasks } from '@/functions/Frontend/Alltasks'
// import { RootState } from '@/utils/Redux/Store/Store'
// import { TaskFetch } from '@/utils/TaskformInterface'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// const AllUserTasks = () => {
//   const [loading, setLoading] = useState(false)
//   const User = useSelector((state: RootState) => state.user)
//   const [ALL_TASKS, setALL_TASKS] = useState<{
//     [key: string]: TaskFetch[]
//   }>({})
//   useEffect(() => {
//     AllTasks(User.Email, setLoading, setALL_TASKS)
//     return () => {
//       AllTasks(User.Email, setLoading, setALL_TASKS)
//     }
//   }, [User.Email]) // Added User.Email as a dependency

//   if (loading) {
//     return (
//       <div className="min-h-screen justify-center items-center flex">
//         <Loader />
//       </div>
//     )
//   }
//   return (
//     <>
//       <h1 className="text-xl sm:text-3xl md:text-4xl text-purpleGradientStart mt-20 px-2 text-center">
//         ALL TASK DETAILS
//       </h1>
//       <div className="overflow-x-auto p-4 text-center w-[90vw] sm:w-auto">
//         {!loading ? (
//           <table className="w-full text-center my-5">
//             <TableHead />
//             <MainTable groupedAttendance={ALL_TASKS} />
//           </table>
//         ) : (
//           <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
//             <h2 className="text-2xl text-white font-bold mb-4">
//               No Tasks Found
//             </h2>
//             <p className="text-lg text-gray-300 mb-6">
//               It seems there are no tasks available. Please check back later or
//               reach out to your administrator.
//             </p>
//             <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
//               Go to Dashboard
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }
// export default AllUserTasks
'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
import { UserFetched } from '@/utils/SignUpInterface'
import { Allusers } from '@/functions/AUTH/Allusers'
import Loader from '@/components/Loader'
import UserSelection from '@/components/Layout/UserSelection'
const AllTasks: React.FC = () => {
  const [Users, SetUserFetched] = useState<UserFetched[]>([])
  const user = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true) // Start loading as true
  // Function to fetch users
  const Getusers = async () => {
    const Data = await Allusers(user.Email)
    if (Data) {
      SetUserFetched(Data)
      setLoading(false)
    }
  }
  // Fetch attendance and users
  useEffect(() => {
    Getusers() // Fetch users
    return () => {
      Getusers() // Fetch attendance
    } // Fetch users
  }, [])
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }
  return (
    <div className="p-6">
      {' '}
      <>
        <UserSelection type="Tasks" Users={Users} />
      </>
    </div>
  )
}
export default AllTasks
