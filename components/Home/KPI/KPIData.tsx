import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { FaBullseye } from 'react-icons/fa'
import { RootState } from '@/utils/Redux/Store/Store'
import TargetsComponent from './TargetsComponent'
import PerformanceComponent from './Performance'
import KpiHeader from './KpiHeader'
const KPIData = () => {
  const userKpi = useSelector((state: RootState) => state.Kpi)
  return (
    <div className="p-4">
      {userKpi ? (
        <motion.div
          className="bg-white shadow-lg border-2 border-purple-400 shadow-purple-500 rounded-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <KpiHeader />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Performance Overview */}
            <motion.div
              className="flex flex-col gap-4 bg-gradient-to-br from-purple-500 to-indigo-500 text-white rounded-lg p-6 shadow-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <PerformanceComponent
                PointsGained={userKpi.PointsGained}
                TotalPoints={userKpi.TotalPoints}
              />
            </motion.div>
            {/* Targets Overview */}
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
                {userKpi.Targets?.length ? (
                  userKpi.Targets.map((target) => (
                    <TargetsComponent key={target.TargetName} target={target} />
                  ))
                ) : (
                  <p className="text-gray-500">No targets available.</p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No KPI data found.</p>
        </div>
      )}
    </div>
  )
}
export default KPIData
