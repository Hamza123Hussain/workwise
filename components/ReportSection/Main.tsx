'use client'
import { useDispatch, useSelector } from 'react-redux'
import EmployeePerformanceCard from './Employee'
import TotalSalaryCard from './SalaryCard'
import TotalStatsCard from './StatsCard'
import { RootState } from '@/utils/Redux/Store/Store'
import { useEffect, useState, useRef } from 'react'
import { GetAllKpi } from '@/functions/Kpi/GetAllKpis'
import { setKpis } from '@/utils/Redux/Slice/kpi/KpiListSlice'
import Loader from '../Loader'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
export default function PerformanceReportPage() {
  // Filename: performance-report-YYYY-MM.pdf
  const now = new Date()
  const dispatch = useDispatch()
  const kpis = useSelector((state: RootState) => state.KpiList)
  const user = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true)
  const divRef = useRef<HTMLDivElement>(null)
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
  }, [dispatch, user._id])

  const handleDownloadPdf = async () => {
    if (!divRef.current) return

    // Capture the div
    const canvas = await html2canvas(divRef.current, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    // PDF settings
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    pdf.save(`performance-report-${year}-${month}.pdf`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    )
  }
  return (
    <div>
      {/* Download Button outside the div to exclude it from PDF */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleDownloadPdf}
          className="px-3 py-1.5 m-1 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Download PDF
        </button>
      </div>
      {/* Content to export */}
      <div ref={divRef} className="bg-white p-4 sm:p-6 shadow-xl rounded-2xl">
        {/* TITLE */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Performance Report
            </h2>
            <p className="text-gray-500 text-sm">
              November
              {'  '} {now.getFullYear()}
            </p>
          </div>
        </div>
        {/* OVERVIEW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b-8 border-indigo-100/50">
          <TotalStatsCard
            title="Total Performance"
            colorClass="text-[#6d3df1]"
            progressColor="bg-[#6d3df1]"
          />
          <TotalStatsCard
            title="Total Attendance"
            colorClass="text-[#f13d7f]"
            progressColor="bg-[#f13d7f]"
          />
          <TotalSalaryCard />
        </div>
        <hr className="my-4 border-gray-100" />
        {kpis.map((element) => (
          <EmployeePerformanceCard key={element._id} element={element} />
        ))}
      </div>
    </div>
  )
}
