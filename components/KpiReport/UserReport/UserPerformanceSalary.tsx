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
  const dispatch = useDispatch()
  const UserKpi = useSelector((state: RootState) => state.Kpi)

  const taskCompletionPercentage =
    (UserKpi.PointsGained / UserKpi.TotalPoints) * 100
  const attendancePercentage = (UserKpi.HoursWorked / 160) * 100
  const performancePercentage =
    attendancePercentage * 0.1 + taskCompletionPercentage * 0.9
  const calculatedSalary = (UserKpi.Salary * performancePercentage) / 100

  useEffect(() => {
    if (User._id) {
      GetSingleKpi(User._id).then((data) => {
        if (data) dispatch(setUserKpi(data))
      })
    }
  }, [User._id, dispatch])

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full mt-10">
      <SalaryGaugeChart
        Salary={User.Salary}
        calculatedsalary={calculatedSalary}
      />
      <div className="flex flex-col items-center w-full">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <FaBullseye /> Targets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full border p-4 rounded-lg shadow-sm">
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
