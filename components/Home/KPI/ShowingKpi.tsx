import { useDispatch, useSelector } from 'react-redux'
import KPIData from './KPIData'
import MonthlyHoursWorked from './ShowingUserHours'
import { RootState } from '@/utils/Redux/Store/Store'
import { useEffect, useState } from 'react'
import { GetSingleKpi } from '@/functions/Kpi/GetSingleKpi'
import { setUserKpi } from '@/utils/Redux/Slice/kpi/KpiSlice'
import ChatLoader from '@/components/Chats/ChatLoader'
const ShowingKpi = () => {
  const Dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const user = useSelector((state: RootState) => state.user)
  useEffect(() => {
    const fetchSingleKpi = async () => {
      try {
        setLoading(true)
        const data = await GetSingleKpi(user._id)
        if (data) Dispatch(setUserKpi(data))
      } catch (error) {
        console.error('Error fetching KPI data:', error)
      } finally {
        setLoading(false)
      }
    }
    if (user._id) fetchSingleKpi()
  }, [user._id, Dispatch])
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <ChatLoader />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row p-5 gap-5">
          <KPIData />
          <MonthlyHoursWorked />{' '}
        </div>
      )}
    </>
  )
}

export default ShowingKpi
