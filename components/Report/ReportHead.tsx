import { months } from '@/utils/Array/MonthsArray'
import { RootState } from '@/utils/Redux/Store/Store'
import { useSelector } from 'react-redux'

// ReportHead.tsx
const ReportHead = () => {
  const currentDate = new Date()
  const monthIndex = useSelector((state: RootState) => state.sort.Month)
  const monthName = months[monthIndex]
  const year = currentDate.getFullYear()

  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className=" text-base sm:text-5xl font-semibold text-gray-800">
        Performance Report for {monthName} {year}
      </h1>
    </div>
  )
}
export default ReportHead
