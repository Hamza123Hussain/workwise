import { Kpi } from '@/utils/Interfaces/KPIInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

const TotalSalaryCard = () => {
  const kpis = useSelector((state: RootState) => state.KpiList)

  const { totalSalary, totalSalaryToPay } = useMemo(() => {
    const totalSalaryToPay = kpis.reduce((a, k: Kpi) => {
      const performance = k.PointsGained / k.TotalPoints
      const attendance = k.HoursWorked / 176
      const salary = k.TotalSalary * (0.8 * performance + 0.2 * attendance)
      return a + salary
    }, 0)

    const totalSalary = kpis.reduce((acc, element: Kpi) => {
      return acc + element.TotalSalary
    }, 0)

    return {
      totalSalary,
      totalSalaryToPay,
    }
  }, [kpis])

  return (
    <div className="bg-[#eff4ff] p-6 rounded-xl shadow-md flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">
            Salaries to be Paid
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-gray-500">
            Total Salary:{' '}
            <span className="text-[#f1823d]">
              {totalSalary.toLocaleString('en-PK', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-4xl font-extrabold text-[#f1823d]">
          PKR{' '}
          <span className="text-4xl ">
            {totalSalaryToPay.toLocaleString('en-PK', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </p>
      </div>

      <div className="mt-4 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-[#f1823d]"
          style={{ width: `${(totalSalaryToPay / totalSalary) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

export default TotalSalaryCard
