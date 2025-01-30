'use client'
import Loader from '@/components/NewReport/Loader'
import { GetAllKpi } from '@/functions/Kpi/GetAllKpis'
import { setKpis } from '@/utils/Redux/Slice/kpi/KpiListSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KpiReportCard from './KpiReportCard'
const Reports = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const user = useSelector((state: RootState) => state.user)
  const kpis = useSelector((state: RootState) => state.KpiList)
  const [loading, setLoading] = useState(true)
  const Dispatch = useDispatch()
  useEffect(() => {
    const fetchKpis = async () => {
      try {
        setLoading(true)
        const Data = await GetAllKpi(user._id)
        if (Data) Dispatch(setKpis(Data))
      } catch (error) {
        console.error('Error fetching KPIs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchKpis()
  }, [user._id, Dispatch])
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    )
  }
  return (
    <div className="mt-10 z-20">
      <div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">
          Performance Report - January {year}
        </h1>
        {kpis.map((userKpi) => (
          <KpiReportCard userKpi={userKpi} key={userKpi.UserId} />
        ))}
      </div>
    </div>
  )
}
export default Reports
