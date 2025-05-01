'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
import Loader from '@/components/NewReport/Loader'
// import { TaskPriorityChart } from '@/components/Report/TaskReport'
import SalaryReport from '@/components/Report/SalaryReport'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { GetAllKpi } from '@/functions/Kpi/GetAllKpis'
import { setKpis } from '@/utils/Redux/Slice/kpi/KpiListSlice'
import KpiReportCard from '@/components/Home/KPI/Card/KpiReportCard'
import { TaskPriorityChart } from '@/components/Report/TaskReport'
const AdminReports: React.FC = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const reportRef = useRef<HTMLDivElement>(null)
  const user = useSelector((state: RootState) => state.user)
  const kpis = useSelector((state: RootState) => state.KpiList)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        setLoading(true)
        const data = await GetAllKpi(user._id)
        if (data) dispatch(setKpis(data))
      } catch (error) {
        console.error('Error fetching KPIs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchKpis()
  }, [user._id, dispatch])

  const downloadPDF = async () => {
    if (!reportRef.current) return
    const canvas = await html2canvas(reportRef.current, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save(`Performance_Report_${'January'}_${year}.pdf`)
  }
  const LowTasks = kpis.reduce((acc, kpi) => {
    const Lowtask = kpi.Targets.filter(
      (target) => target.Priority === 'Low'
    ).length
    return acc + Lowtask
  }, 0)

  const HighTasks = kpis.reduce((acc, kpi) => {
    const HighTask = kpi.Targets.filter(
      (target) => target.Priority === 'High'
    ).length
    return acc + HighTask
  }, 0)

  const TotalTasks = kpis.reduce((acc, kpi) => {
    return acc + kpi.Targets.length
  }, 0)

  return (
    <div className="p-5 z-20">
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      )}

      <div className="flex justify-between items-center mb-1">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>
      <div ref={reportRef} className="">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-3 ">
          Performance Report - {'April'} {year}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.length > 0 ? (
            kpis.map((report) => (
              <KpiReportCard report={report} key={report.UserId} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No reports available.
            </p>
          )}
        </div>
        <div className=" flex items-center gap-5 justify-center">
          <div>
            <TaskPriorityChart
              lowPriorityTasks={LowTasks}
              highPriorityTasks={HighTasks}
              totalTasks={TotalTasks}
            />
          </div>

          <SalaryReport formattedTotalSalary={225000} />
        </div>
      </div>
    </div>
  )
}

export default AdminReports
