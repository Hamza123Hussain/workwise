import React, { useEffect, useState } from 'react'
import KpiRow from './KpiRow'
import OverallTarget from './OverallTarget'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { GetSingleKpi } from '@/functions/Kpi/GetSingleKpi'
import { setUserKpi } from '@/utils/Redux/Slice/kpi/KpiSlice'
import ChatLoader from '@/components/Chats/ChatLoader'
const KpiMain = () => {
  const Userkpi = useSelector((state: RootState) => state.Kpi)
  const user = useSelector((state: RootState) => state.user)
  const Dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
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
        <div className="flex flex-col gap-[10px] py-5 px-[10px] rounded-[20px] bg-[#E8FFE8] w-full">
          <span className="text-[24px] font-bold text-[#4E6747]">
            {"KPI's"}
          </span>
          <div className="flex flex-col items-center justify-between gap-[10px]">
            <OverallTarget />
            <div className="bg-white py-[10px] rounded-[8px] w-full max-h-80 overflow-y-auto px-2 flex flex-col">
              <div>
                {Userkpi?.Targets?.map((target, index) => (
                  <KpiRow
                    key={target.TargetName}
                    index={index}
                    length={Userkpi.Targets.length}
                    target={target}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default KpiMain
