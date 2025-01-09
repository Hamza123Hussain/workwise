'use client'
import React, { useState, useEffect, useRef } from 'react'
import { NewReport } from '@/utils/Interfaces/NewReportInterface'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import MonthFilter from '@/components/NewReport/MonthFilter'
import { fetchReports } from '@/functions/Report/FetchReports'
import ReportCard from '@/components/NewReport/ReportCard'
import Loader from '@/components/NewReport/Loader'
import { TaskPriorityChart } from '@/components/Report/TaskReport'
import SalaryReport from '@/components/Report/SalaryReport'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
const AdminReports: React.FC = () => {
  const [reports, setReports] = useState<NewReport[]>([])
  const [filteredReports, setFilteredReports] = useState<NewReport[]>([])
  const [error, setError] = useState('')
  const [selectedMonth, setSelectedMonth] = useState<string>('') // Month filter state
  const [loading, setLoading] = useState(true)
  const User = useSelector((state: RootState) => state.user)
  const reportRef = useRef<HTMLDivElement>(null)
  // Get current month and year
  const currentDate = new Date()
  const year = currentDate.getFullYear()
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
  const TotalSalary = filteredReports.reduce((salary, element) => {
    salary += element.Salary
    return salary
  }, 0)
  const HighPriorityTasks = filteredReports.reduce((HighPriority, element) => {
    HighPriority += element.HighPriorityTask
    return HighPriority
  }, 0)
  const LowPriorityTasks = filteredReports.reduce((Low, element) => {
    Low += element.lowPriorityTask
    return Low
  }, 0)
  const TotalTasks = filteredReports.reduce((Tasks, element) => {
    Tasks += element.TotalTasks
    return Tasks
  }, 0)
  const downloadPDF = async () => {
    if (!reportRef.current) return
    const canvas = await html2canvas(reportRef.current, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`Performance_Report_${selectedMonth}_${year}.pdf`)
  }
  return (
    <div className="p-5 mt-10 z-20">
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      )}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex justify-between items-center mb-1">
        <MonthFilter
          reports={reports}
          setFilteredReports={setFilteredReports}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <button
          onClick={downloadPDF}
          className=" bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Download PDF
        </button>{' '}
      </div>
      <div ref={reportRef} className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-5">
          Performance Report - {selectedMonth} {year}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportCard report={report} key={report._id} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No reports available.
            </p>
          )}
        </div>
        <div>
          <TaskPriorityChart
            lowPriorityTasks={LowPriorityTasks}
            highPriorityTasks={HighPriorityTasks}
            totalTasks={TotalTasks}
          />
        </div>
        <div>
          <SalaryReport formattedTotalSalary={TotalSalary} />
        </div>
      </div>
    </div>
  )
}
export default AdminReports
