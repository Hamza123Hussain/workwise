import React from 'react'
import { AttendanceRecord } from '@/utils/AttendanceInterface'
import { TaskFetch } from '@/utils/TaskformInterface'
import AttendanceTableRow from './TableAttendanceRow'
import TaskTableRow from './TableTaskRow'

type GroupedAttendanceProps = {
  [key: string]: AttendanceRecord[] | TaskFetch[]
}

const MainTable = ({
  groupedAttendance,
}: {
  groupedAttendance: GroupedAttendanceProps
}) => {
  return (
    <>
      {Object.entries(groupedAttendance).map(([userData, records]) => {
        if (Array.isArray(records)) {
          // Check if records are AttendanceRecord[]
          if (records.length > 0 && 'UserData' in records[0]) {
            return (
              <AttendanceTableRow
                key={userData}
                userData={userData}
                records={records as AttendanceRecord[]}
              />
            )
          }
          // Check if records are TaskFetch[]
          else if (records.length > 0 && 'assignedTo' in records[0]) {
            return (
              <TaskTableRow
                key={userData}
                userData={userData}
                records={records as TaskFetch[]}
              />
            )
          }
        }
        return null
      })}
    </>
  )
}

export default MainTable
