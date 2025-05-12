import React, { useEffect } from 'react'
import SalaryGaugeChart from '../SalaryPieChart'
import { GetSingleKpi } from '@/functions/Kpi/GetSingleKpi'
import { useDispatch, useSelector } from 'react-redux'
import { setUserKpi } from '@/utils/Redux/Slice/kpi/KpiSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import { User } from '@/utils/Interfaces/Report_Interface'
import { FaBullseye } from 'react-icons/fa'
import TargetsComponent from '@/components/Home/KPI/TargetsComponent'
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
    <div className=" flex flex-col sm:flex-row justify-center items-center  ml-12  w-full">
      <SalaryGaugeChart
        Salary={User.Salary}
        calculatedsalary={calculatedSalary}
      />
      <div className=" flex flex-col justify-center items-center">
        <h2 className="text-lg font-bold text-gray-700 flex  items-center gap-2">
          <FaBullseye /> Targets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center border-2 border-gray-200 rounded-lg p-4 gap-10">
          {UserKpi.Targets?.length ? (
            UserKpi.Targets.map((target) => (
              <TargetsComponent key={target.TargetName} target={target} />
            ))
          ) : (
            <p className="text-gray-500">No targets available.</p>
          )}
        </div>
      </div>
    </div>
  )
}
export default UserPerformanceSalary
