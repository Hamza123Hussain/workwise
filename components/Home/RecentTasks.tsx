import { useEffect } from 'react'
import { GetAllTasks } from '../../functions/Task/AllTasks'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/Redux/Store/Store'
const RecentTasks = () => {
  const User = useSelector((state: RootState) => state.user)
  // const FetchData = async () => {
  //   const Data = await GetAllTasks(User.Email)
  //   if (Data) {
  //     console.log('DATA AAAAA ', Data)
  //   }
  // }
  // useEffect(() => {
  //   FetchData()
  // }, [User.Email])
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="font-semibold text-2xl text-[#003366]">Recent Tasks</h2>
      <div className="mt-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2 text-left">Task</th>
              <th className="border border-gray-300 p-2 text-left">
                Assigned To
              </th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Design Homepage</td>
              <td className="border border-gray-300 p-2">John Doe</td>
              <td className="border border-gray-300 p-2">In Progress</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Develop Backend</td>
              <td className="border border-gray-300 p-2">Jane Smith</td>
              <td className="border border-gray-300 p-2">Completed</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">
                Write Documentation
              </td>
              <td className="border border-gray-300 p-2">Alice Johnson</td>
              <td className="border border-gray-300 p-2">Pending</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Setup Database</td>
              <td className="border border-gray-300 p-2">Bob Brown</td>
              <td className="border border-gray-300 p-2">In Progress</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Test Application</td>
              <td className="border border-gray-300 p-2">Eve Davis</td>
              <td className="border border-gray-300 p-2">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default RecentTasks
