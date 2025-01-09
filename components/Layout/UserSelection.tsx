import React from 'react'
import { UserFetched } from '@/utils/Interfaces/SignUpInterface'
import DropDown from './DropDown'
import TaskPage from '../Tasks/TaskPage'
import AttendancePage from '../Attendance/AttendancePage'
const UserSelection = ({
  type,
  Users,
}: {
  type: string
  Users: UserFetched[]
}) => {
  return (
    <>
      <DropDown type={type} Users={Users} />

      {type === 'Attendance' ? <AttendancePage type={type} /> : <TaskPage />}
    </>
  )
}
export default UserSelection
