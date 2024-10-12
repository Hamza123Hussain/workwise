import { convertHoursToString } from '@/functions/Attendance/TimeFunctions'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
const AttendanceCard = ({ element }: { element: AttendanceRecord }) => {
  return (
    <tr key={element.id} className="border-b hover:bg-purple-80">
      <td className="border border-purple-800 px-4 py-2 text-[8px] text-white  sm:text-base md:text-lg">
        {element.UserData || '-'}
      </td>
      <td className="border border-purple-800 px-4 py-2 text-[8px] text-white  sm:text-base md:text-lg">
        {element.entry ? new Date(element.entry).toLocaleTimeString() : '-'}
      </td>
      <td className="border border-purple-800 px-4 py-2 text-[8px] text-white  sm:text-base md:text-lg">
        {element.exit ? new Date(element.exit).toLocaleTimeString() : '-'}
      </td>
      <td className="border border-purple-800 px-4 py-2 text-[8px] text-white  sm:text-base md:text-lg">
        {element.Hours_Worked ? convertHoursToString(element.Hours_Worked) : ''}
      </td>
      <td className="border border-purple-800 px-4 py-2 text-[8px] text-white  sm:text-base md:text-lg">
        {element.Hours_Worked
          ? element.Hours_Worked > 8
            ? '0hrs, 0mins, 0secs'
            : convertHoursToString(8 - element.Hours_Worked)
          : ''}
      </td>
      <td className="border border-purple-800 px-4 py-2 text-[8px] text-white  sm:text-base md:text-lg">
        {element.currentDate
          ? new Date(element.currentDate).toLocaleDateString()
          : '-'}
      </td>
    </tr>
  )
}
export default AttendanceCard
