import KPIData from './KPIData'
import MonthlyHoursWorked from './ShowingUserHours'

const ShowingKpi = () => {
  return (
    <div className="flex flex-col sm:flex-row p-5 gap-5">
      <KPIData />
      <MonthlyHoursWorked />
    </div>
  )
}

export default ShowingKpi
