import React, { useEffect } from 'react'
import SalaryGaugeChart from '../SalaryPieChart'
import { GetSingleKpi } from '@/functions/Kpi/GetSingleKpi'
import { useDispatch, useSelector } from 'react-redux'
import { setUserKpi } from '@/utils/Redux/Slice/kpi/KpiSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import { User } from '@/utils/Interfaces/Report_Interface'
const UserPerformanceSalary = ({ User }: { User: User }) => {
  const Dispatch = useDispatch()
  // Categorize tasks by priority
  const UserKpi = useSelector((state: RootState) => state.Kpi)
  const taskCompletionPercentage =
    (UserKpi.PointsGained / UserKpi.TotalPoints) * 100
  const attendancePercentage = (UserKpi.HoursWorked / 160) * 100
  const performancePercentage =
    attendancePercentage * 0.1 + taskCompletionPercentage * 0.9
  const calculatedSalary = (UserKpi.Salary * performancePercentage) / 100
  useEffect(() => {
    const fetchSingleKpi = async () => {
      try {
        const data = await GetSingleKpi(User._id)
        if (data) Dispatch(setUserKpi(data))
      } catch (error) {
        console.error('Error fetching KPI data:', error)
      }
    }
    if (User._id) fetchSingleKpi()
  }, [User._id, Dispatch])
  return (
    <>
      <SalaryGaugeChart
        Salary={User.Salary}
        calculatedsalary={calculatedSalary}
      />
    </>
  )
}

export default UserPerformanceSalary
