import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { TaskFetch } from '@/utils/TaskformInterface'

export const groupByUserData = (Data: AttendanceRecord[] | TaskFetch[]) => {
  return Data.reduce((acc, record) => {
    if ('UserData' in record) {
      // Handle AttendanceRecord
      const userData = record.UserData
      if (!acc[userData]) {
        acc[userData] = []
      }
      acc[userData].push(record as AttendanceRecord)
    } else if ('assignedTo' in record) {
      // Handle TaskFetch
      const assignedTo = record.assignedTo
      if (!acc[assignedTo]) {
        acc[assignedTo] = []
      }
      acc[assignedTo].push(record as TaskFetch)
    }
    return acc
  }, {} as { [key: string]: (AttendanceRecord | TaskFetch)[] })
}
// learn the as part
