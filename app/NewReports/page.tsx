'use client'
import Loader from '@/components/NewReport/Loader'
import { GetAllKpi } from '@/functions/Kpi/GetAllKpis'
import { setKpis } from '@/utils/Redux/Slice/kpi/KpiListSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KpiReportCard from '@/components/KpiReport/KpiReportCard'

const NewReports = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const reportRef = useRef<HTMLDivElement>(null)
  const user = useSelector((state: RootState) => state.user)
  const kpis = useSelector((state: RootState) => state.KpiList)
  const [loading, setLoading] = useState(true)
  const Dispatch = useDispatch()

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        setLoading(true)
        const Data = await GetAllKpi(user._id)
        if (Data) Dispatch(setKpis(Data))
      } catch (error) {
        console.error('Error fetching KPIs:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchKpis()
  }, [user._id, Dispatch])

  const downloadPDF = async () => {
    if (!reportRef.current) return
    const pdf = new jsPDF('p', 'mm', 'a4')

    for (const kpi of kpis) {
      const kpiElement = document.getElementById(`kpi-${kpi.UserId}`)
      if (!kpiElement) continue
      const canvas = await html2canvas(kpiElement, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.addPage()
    }

    pdf.save(`Performance_Report_${'January'}_${year}.pdf`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="mt-10 z-20">
      <div className="flex justify-between items-center mb-5 px-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>

      <div ref={reportRef}>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">
          Performance Report - January {year}
        </h1>

        {kpis.map((userKpi) => (
          <KpiReportCard userKpi={userKpi} key={userKpi.UserId} />
        ))}
      </div>
    </div>
  )
}

export default NewReports
