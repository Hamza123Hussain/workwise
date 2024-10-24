import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { RefObject } from 'react'

// Function to download the PDF
export const downloadPDF = async (
  reportRef: RefObject<HTMLDivElement>
): Promise<void> => {
  const report = reportRef.current
  if (!report) return

  // Capture the component with html2canvas
  const canvas = await html2canvas(report, {
    backgroundColor: '#ffffff', // Ensure the canvas captures a white background
  })

  const imgData = canvas.toDataURL('image/png')

  // Create jsPDF instance
  const pdf = new jsPDF('p', 'mm', 'a4')
  const imgWidth = 210 // A4 width in mm
  const pageHeight = 297 // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  let heightLeft = imgHeight
  let position = 0

  // Draw white background on each page
  const whiteBackgroundColor = '#ffffff' // Set background color to white
  pdf.setFillColor(whiteBackgroundColor)
  pdf.rect(0, 0, imgWidth, pageHeight, 'F') // White background for the first page
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)

  heightLeft -= pageHeight

  // Handle multiple pages if the content is larger than one page
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight
    pdf.addPage()

    pdf.rect(0, 0, imgWidth, pageHeight, 'F') // White background for subsequent pages
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  // Save the generated PDF
  pdf.save(`performance_report_${new Date().toISOString().slice(0, 10)}.pdf`)
}
