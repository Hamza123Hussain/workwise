'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import { setKpis } from '@/utils/Redux/Slice/kpi/KpiListSlice'
import { GetAllKpi } from '@/functions/Kpi/GetAllKpis'
import KpiCard from '@/components/Home/KPI/Card/KpiCard'
import { KpiModal } from '@/components/Home/KPI/CreateKpi/CreateModal'
const KpiList = () => {
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
  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 via-white to-gray-100 min-h-screen">
      <h2 className="text-3xl font-extrabold text-purple-700 mb-8 text-center">
        All KPIs
      </h2>
      <div className=" flex justify-end">
        <KpiModal />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-semibold text-purple-600"
          >
            Loading KPIs...
          </motion.div>
        </div>
      ) : kpis.length === 0 ? (
        <div className="text-gray-600 text-center text-lg">
          No KPIs found. Please check back later.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.UserId} kpi={kpi} />
          ))}
        </div>
      )}
    </div>
  )
}
export default KpiList
