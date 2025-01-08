import { GetSingleKpi } from '@/functions/Kpi/GetSingleKpi'
import { Kpi } from '@/utils/Interfaces/KPIInterface'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FaBullseye } from 'react-icons/fa'
import TargetsComponent from './TargetsComponent'
import PerformanceComponent from './Performance'
import KpiHeader from './KpiHeader'
const KPIData = () => {
  const [UserKpi, SetKpi] = useState<Kpi>()
  const User = useSelector((state: RootState) => state.user)
  useEffect(() => {
    const SingleKpi = async () => {
      const Data = await GetSingleKpi(User._id)
      if (Data) {
        SetKpi(Data)
      }
    }
    SingleKpi()
  }, [User._id])
  return (
    <motion.div
      className=" bg-white shadow-lg border-2 border-purple-400 shadow-purple-500 rounded-lg p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <KpiHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          className="flex flex-col gap-4 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-lg p-6 shadow-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <PerformanceComponent
            PointsGained={UserKpi?.PointsGained}
            TotalPoints={UserKpi?.TotalPoints}
          />
        </motion.div>
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[55vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
            <FaBullseye /> Targets
          </h2>
          <div className="divide-y divide-gray-200">
            {UserKpi?.Targets.map((target) => (
              <TargetsComponent key={target.TargetName} target={target} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
export default KPIData
