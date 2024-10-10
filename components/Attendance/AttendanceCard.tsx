import {
  calculateRemainingTime,
  formatDuration,
} from '../../functions/Attendance/TimeFunctions'
import { AttendanceRecord } from '../../utils/AttendanceInterface'
const AttendanceCard = ({ element }: { element: AttendanceRecord }) => {
  let duration = '-'
  let remainingTime = '-'
  if (element.entry && element.exit) {
    const entryTime = new Date(element.entry).getTime()
    const exitTime = new Date(element.exit).getTime()
    const timeDifference = exitTime - entryTime
    duration = formatDuration(timeDifference)
    remainingTime = calculateRemainingTime(timeDifference)
  }
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
        {duration}
      </td>
      <td className="border border-purple-800 px-4 py-2 text-[8px] text-white  sm:text-base md:text-lg">
        {remainingTime}
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
