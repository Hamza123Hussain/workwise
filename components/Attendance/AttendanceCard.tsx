import { convertHoursToString } from '@/functions/Attendance/TimeFunctions'
import { AttendanceRecord } from '../../utils/Interfaces/AttendanceInterface'
import { motion } from 'framer-motion'
import { FaSignInAlt, FaSignOutAlt, FaRegClock } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { BsFillCalendarEventFill } from 'react-icons/bs'
const AttendanceCard = ({ element }: { element: AttendanceRecord }) => {
  return (
    <motion.div
      className="space-y-4 bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Date Section */}
      <div className="flex items-center gap-2 text-xl font-semibold text-purple-600">
        <BsFillCalendarEventFill className="text-lg" />
        <span>
          {element.currentDate
            ? new Date(element.currentDate).toLocaleDateString()
            : '-'}
        </span>
      </div>
      {/* Attendance Details Section */}
      <div className="text-gray-800 space-y-3">
        {/* Entry Time */}
        <div className="flex items-center flex-col justify-between py-2 px-3 bg-gray-50 rounded-lg">
          <div className="flex  items-center gap-2 text-sm">
            <FaSignInAlt className="text-purple-600" />
            <span className="font-medium">Entry Time</span>
          </div>
          <span className="text-sm text-gray-600">
            {element.entry ? new Date(element.entry).toLocaleTimeString() : '-'}
          </span>
        </div>
        {/* Exit Time */}
        <div className="flex items-center flex-col justify-between py-2 px-3 bg-gray-50 rounded-lg">
          <div className="flex  items-center gap-2 text-sm">
            <FaSignOutAlt className="text-purple-600" />
            <span className="font-medium">Exit Time</span>
          </div>
          <span className="text-sm text-gray-600">
            {element.exit ? new Date(element.exit).toLocaleTimeString() : '-'}
          </span>
        </div>
        {/* Hours Worked */}
        <div className="flex items-center flex-col  justify-between py-2 px-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <FaRegClock className="text-purple-600" />
            <span className="font-medium">Hours Worked:</span>
          </div>
          <span className="text-sm text-gray-600">${element.Hours_Worked}</span>
        </div>
        {/* Remaining Time */}
        <div className="flex items-center flex-col justify-between py-2 px-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <IoMdTime className="text-purple-600" />
            <span className="font-medium">Remaining Time:</span>
          </div>
          <span className="text-sm text-gray-600">
            {element.Hours_Worked
              ? element.Hours_Worked > 8
                ? '0 hrs'
                : convertHoursToString(8 - element.Hours_Worked)
              : '8 hrs'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
export default AttendanceCard
