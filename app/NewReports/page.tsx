'use client'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import Loader from '@/components/NewReport/Loader'
import { GetAllKpi } from '@/functions/Kpi/GetAllKpis'
import { setKpis } from '@/utils/Redux/Slice/kpi/KpiListSlice'
import { RootState } from '@/utils/Redux/Store/Store'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Target } from '@/utils/Interfaces/KPIInterface'

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

  const COLORS = ['#E63946', '#F4A261', '#2A9D8F']

  const renderPieChart = (targets: Target[]) => {
    const high = targets.filter((t) => t.Priority === 'High').length
    const medium = targets.filter((t) => t.Priority === 'Medium').length
    const low = targets.filter((t) => t.Priority === 'Low').length

    const total = high + medium + low

    const data = [
      { name: 'High Priority', value: high },
      { name: 'Medium Priority', value: medium },
      { name: 'Low Priority', value: low },
    ]

    return (
      <div className="flex flex-col items-center">
        {/* Pie Chart */}
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/* Dynamic Summary */}
        <div className="mt-4 text-center text-sm">
          <p>
            Out of <span className="font-bold">{total}</span> targets:
          </p>
          <p className="text-red-600">
            <span className="font-bold">{high}</span> are high priority (
            {((high / total) * 100).toFixed(1)}%)
          </p>
          <p className="text-yellow-600">
            <span className="font-bold">{medium}</span> are medium priority (
            {((medium / total) * 100).toFixed(1)}%)
          </p>
          <p className="text-green-600">
            <span className="font-bold">{low}</span> are low priority (
            {((low / total) * 100).toFixed(1)}%)
          </p>
        </div>
      </div>
    )
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
      {/* Download Button */}
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>

      {/* Report Section */}
      <div ref={reportRef}>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">
          Performance Report - {'January'} {year}
        </h1>

        {/* User KPIs */}
        {kpis.map((userKpi) => (
          <div
            id={`kpi-${userKpi.UserId}`}
            key={userKpi.UserId}
            className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-xl mb-10 border border-gray-300"
          >
            {/* Header */}
            <div className="flex justify-between flex-col items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-700">
                  {userKpi.UserName}
                </h2>
                <p className="text-gray-500">{userKpi.UserEmail}</p>
              </div>
              {renderPieChart(userKpi.Targets)}
            </div>
            {/* KPI and Placeholder Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-bold">Hours Worked:</span>{' '}
                  {/* Placeholder */}
                  <span className="text-blue-600"> {'N/A'}</span>
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-bold">Attendance %:</span>{' '}
                  {/* Placeholder */}
                  <span className="text-blue-600"> {'N/A'}%</span>
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-bold">Performance %:</span>{' '}
                  {/* Placeholder */}
                  <span className="text-blue-600"> {'N/A'}%</span>
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-bold">Salary:</span> {/* Placeholder */}
                  <span className="text-blue-600"> {'N/A'}</span>
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-bold">Task %:</span> {/* Placeholder */}
                  <span className="text-blue-600"> {'N/A'}%</span>
                </p>
              </div>
            </div>
            {/* Target Details */}
            <h3 className="text-xl font-bold text-gray-700 mt-6">
              Target Details
            </h3>
            <div className="space-y-4 mt-4">
              {userKpi.Targets.map((target, index) => (
                <div
                  key={index}
                  className={`rounded-lg ${
                    target.Priority === 'High'
                      ? 'bg-red-50'
                      : target.Priority === 'Medium'
                      ? 'bg-yellow-50'
                      : 'bg-green-50'
                  }`}
                >
                  <p className="text-gray-700 font-bold">{target.TargetName}</p>
                  <p className="text-gray-600">
                    Value Achieved: {target.ValueAchieved} /{' '}
                    {target.TargetValue}
                  </p>
                  <p className="text-gray-600">
                    Points: {target.PointsGained} / {target.TotalPoints}
                  </p>
                  <p className="text-gray-600">Priority: {target.Priority}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewReports
