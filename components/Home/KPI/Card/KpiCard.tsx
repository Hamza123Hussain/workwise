import React from 'react'
import { motion } from 'framer-motion'
import { Kpi } from '@/utils/Interfaces/KPIInterface'
import TargetComponent from './TargetComponent'
import CardHeader from './CardHeader'
const KpiCard = ({ kpi }: { kpi: Kpi }) => {
  return (
    <motion.div
      key={kpi.UserId}
      className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-shadow duration-300"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CardHeader
        UserEmail={kpi.UserEmail}
        UserName={kpi.UserName}
        Targets={kpi.Targets}
        PointsGained={kpi.PointsGained}
        TotalPoints={kpi.TotalPoints}
      />
      <div className="divide-y divide-gray-200 h-[50vh] overflow-y-auto">
        {kpi.Targets.map((target) => (
          <TargetComponent target={target} key={target.TargetName} />
        ))}
      </div>
    </motion.div>
  )
}
export default KpiCard
