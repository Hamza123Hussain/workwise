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
    <tr key={element.id} className="border-b hover:bg-gray-50">
      <td className="border border-gray-300 px-4 py-2 text-sm">
        {element.UserData || '-'}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-sm">
        {element.entry ? new Date(element.entry).toLocaleTimeString() : '-'}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-sm">
        {element.exit ? new Date(element.exit).toLocaleTimeString() : '-'}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-sm">{duration}</td>
      <td className="border border-gray-300 px-4 py-2 text-sm">
        {remainingTime}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-sm">
        {element.isAbsent ? 'Yes' : 'No'}
      </td>
      <td className="border border-gray-300 px-4 py-2 text-sm">
        {element.currentDate
          ? new Date(element.currentDate).toLocaleDateString()
          : '-'}
      </td>
    </tr>
  )
}
export default AttendanceCard
