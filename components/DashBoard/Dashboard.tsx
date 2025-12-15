import React from 'react'
import AttendanceSection from './Attendance/AttendanceSection'
import KpiMain from './Kpi/KpiMain'
import UserTask from './UserTasks/UserTasks'

const Dashboard = () => {
  return (
    <div className=" flex flex-col sm:flex-row p-2 gap-[10px]">
      <AttendanceSection />
      <div className=" flex flex-col gap-2 w-full">
        <KpiMain />
        <UserTask />
      </div>
    </div>
  )
}

export default Dashboard
