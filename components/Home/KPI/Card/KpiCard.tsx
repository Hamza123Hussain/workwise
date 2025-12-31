import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Kpi } from '@/utils/Interfaces/KPIInterface'
import TargetComponent from './TargetComponent'
import CardHeader from './CardHeader'
import EditTargetsModal from './EditTargetModal'

const KpiCard = ({ kpi }: { kpi: Kpi }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userTargets, setUserTargets] = useState(kpi.Targets)

  const handleUpdate = (updatedTargets: typeof userTargets) => {
    setUserTargets(updatedTargets)
  }

  return (
    <>
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-purple-500 hover:shadow-xl transition-all duration-300 flex flex-col"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <CardHeader
          UserEmail={kpi.UserEmail}
          UserName={kpi.UserName}
          Targets={userTargets}
          PointsGained={kpi.PointsGained}
          TotalPoints={kpi.TotalPoints}
          onEdit={() => setIsModalOpen(true)}
        />
        <div className="divide-y divide-gray-200">
          {userTargets.map((target) => (
            <TargetComponent target={target} key={target.TargetName} />
          ))}
        </div>
      </motion.div>

      <EditTargetsModal
        user={{ ...kpi, Targets: userTargets }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdate}
      />
    </>
  )
}

export default KpiCard
