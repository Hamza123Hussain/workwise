'use client'
import React, { useState, useEffect } from 'react'
import { NewReport } from '@/utils/NewReportInterface'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import MonthFilter from '@/components/NewReport/MonthFilter'
import { fetchReports } from '@/functions/Report/FetchReports'
import ReportCard from '@/components/NewReport/ReportCard'
import Loader from '@/components/NewReport/Loader'
const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<NewReport[]>([])
  const [filteredReports, setFilteredReports] = useState<NewReport[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const User = useSelector((state: RootState) => state.user)
  // UseEffect to call the fetchReports function when the component is mounted
  useEffect(() => {
    fetchReports(
      User.Email,
      setReports,
      setFilteredReports,
      setError,
      setLoading
    )
  }, [])
  return (
    <div className="p-5 mt-10 z-20">
      <h1 className="text-2xl font-bold mb-5">Admin - All Reports</h1>

      {loading && (
        <div className=" flex justify-center min-h-screen items-center">
          <Loader />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MonthFilter reports={reports} setFilteredReports={setFilteredReports} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <ReportCard report={report} key={report._id} />
          ))
        ) : (
          <p>No reports available</p>
        )}
      </div>
    </div>
  )
}
export default AdminReports
