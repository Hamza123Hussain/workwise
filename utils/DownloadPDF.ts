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
    scale: 2, // Increase resolution by scaling the canvas
  })

  const imgData = canvas.toDataURL('image/png')

  // Create jsPDF instance
  const pdf = new jsPDF('p', 'mm', 'a4')
  const imgWidth = 210 // A4 width in mm
  const pageHeight = 297 // A4 height in mm
  const marginTop = 10 // Add top margin to avoid logo cutoff

  // Calculate image height proportionally
  let imgHeight = (canvas.height * imgWidth) / canvas.width
  let heightLeft = imgHeight
  let position = marginTop // Start after the margin

  // Ensure scaling fits the page, and avoid cutting the top
  if (imgHeight > pageHeight) {
    imgHeight = pageHeight - marginTop // Ensure the first page fits within the page height with margin
  }

  // Add the captured image to the PDF
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  // Handle multiple pages if the content exceeds one page
  while (heightLeft > 0) {
    position = heightLeft - imgHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  // Save the generated PDF
  pdf.save(`performance_report_${new Date().toISOString().slice(0, 10)}.pdf`)
}
