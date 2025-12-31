import React from 'react'
import { UserFetched } from '@/utils/Interfaces/SignUpInterface'
import DropDown from './DropDown'
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

      <AttendancePage type={type} />
    </>
  )
}
export default UserSelection
