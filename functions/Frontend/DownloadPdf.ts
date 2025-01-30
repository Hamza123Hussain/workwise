import { Kpi } from '@/utils/Interfaces/KPIInterface'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const downloadPDF = async (
  kpis: Kpi[],
  year: number,
  reportRef: React.RefObject<HTMLDivElement>
) => {
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
