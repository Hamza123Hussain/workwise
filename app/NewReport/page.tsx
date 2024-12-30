'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NewReport } from '@/utils/NewReportInterface'
import { ApiUrl } from '@/utils/AttendanceInterface'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'

const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<NewReport[]>([])
  const [filteredReports, setFilteredReports] = useState<NewReport[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState<string>('') // Month filter state
  const User = useSelector((state: RootState) => state.user)

  // Array of all months
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Function to fetch all reports
  const fetchReports = async () => {
    try {
      const response = await axios.get<NewReport[]>(
        `${ApiUrl}Api/Report/AllReports?email=${User.Email}`
      )
      setReports(response.data)
      setFilteredReports(response.data) // Initialize filteredReports with all reports
    } catch (err) {
      setError('Failed to fetch reports')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Filter reports based on selected month
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value
    setSelectedMonth(month)
    if (month === '') {
      setFilteredReports(reports) // Show all reports if no filter
    } else {
      const filtered = reports.filter((report) => report.Month === month)
      setFilteredReports(filtered)
    }
  }

  // UseEffect to call the fetchReports function when the component is mounted
  useEffect(() => {
    fetchReports()
  }, [])

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Admin - All Reports</h1>

      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="mb-5">
        <label htmlFor="month" className="mr-2">
          Filter by Month:
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border p-2"
        >
          <option value="">All</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div
              key={report._id}
              className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-start"
            >
              <h2 className="text-xl font-semibold mb-2">{report.UserName}</h2>
              <p className="text-sm text-gray-600">User ID: {report.UserID}</p>
              <p className="text-sm">Month: {report.Month}</p>
              <p>Total Tasks: {report.TotalTasks}</p>
              <p>Task Percentage: {report.TaskPercentage}%</p>
              <p>Attendance Percentage: {report.AttendancePercentage}%</p>
              <p>Performance Percentage: {report.PerformancePercentage}%</p>
              <p className="font-bold mt-3">Salary: ${report.Salary}</p>
            </div>
          ))
        ) : (
          <p>No reports available</p>
        )}
      </div>
    </div>
  )
}

export default AdminReports
