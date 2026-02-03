import React from 'react'
import AttendanceSection from './Attendance/AttendanceSection'
import KpiMain from './Kpi/KpiMain'
const Dashboard = () => {
  return (
    <div className=" flex flex-col sm:flex-row p-2 gap-[10px]">
      <AttendanceSection />

      <KpiMain />
    </div>
  )
}

export default Dashboard
