import { months } from '@/utils/MonthsArray'
import { NewReport } from '@/utils/NewReportInterface'
import React from 'react'

const MonthFilter = ({
  reports,
  setFilteredReports,
  selectedMonth,
  setSelectedMonth,
}: {
  reports: NewReport[]
  setFilteredReports: (report: NewReport[]) => void
  selectedMonth: string
  setSelectedMonth: (month: string) => void
}) => {
  const month = new Date().toLocaleString('default', { month: 'long' })
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
  return (
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
        <option value="">{month}</option>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MonthFilter
