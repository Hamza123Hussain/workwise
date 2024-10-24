import { convertHoursToString } from '@/functions/Attendance/TimeFunctions'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
const AttendanceCard = ({ element }: { element: AttendanceRecord }) => {
  return (
    <tr key={element.id} className="border-b hover:bg-purple-80">
      <td className="border border-purple-800 px-4 py-2  text-white text-xs ">
        {element.UserData || '-'}
      </td>
      <td className="border border-purple-800 px-4 py-2  text-white  text-xs ">
        {element.entry ? new Date(element.entry).toLocaleTimeString() : '-'}
      </td>
      <td className="border border-purple-800 px-4 py-2  text-white  text-xs ">
        {element.exit ? new Date(element.exit).toLocaleTimeString() : '-'}
      </td>{' '}
      <td className="border border-purple-800 px-4 py-2  text-white  text-xs ">
        {element.Break_Time ? convertHoursToString(element.Break_Time) : '-'}
      </td>
      <td className="border border-purple-800 px-4 py-2  text-white  text-xs ">
        {element.Hours_Worked
          ? convertHoursToString(element.Hours_Worked - element.Break_Time)
          : ''}
      </td>
      <td className="border border-purple-800 px-4 py-2  text-white  text-xs ">
        {element.Hours_Worked
          ? element.Hours_Worked > 8
            ? '0hrs, 0mins, 0secs'
            : convertHoursToString(8 - element.Hours_Worked)
          : ''}
      </td>
      <td className="border border-purple-800 px-4 py-2  text-white  text-xs ">
        {element.currentDate
          ? new Date(element.currentDate).toLocaleDateString()
          : '-'}
      </td>
    </tr>
  )
}
export default AttendanceCard
