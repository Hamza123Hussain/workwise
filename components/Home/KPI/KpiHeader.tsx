import { RootState } from '@/utils/Redux/Store/Store'
import React from 'react'
import { useSelector } from 'react-redux'

const KpiHeader = () => {
  const User = useSelector((state: RootState) => state.user)
  return (
    <div className="text-center mb-6">
      <h1 className="text-2xl font-extrabold text-gray-800">KPI Dashboard</h1>
      <p className="text-gray-600 text-sm">
        Tracking performance for {User.Name}
      </p>
    </div>
  )
}

export default KpiHeader
