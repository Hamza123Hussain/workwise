import { downloadPDF } from '@/utils/DownloadPDF'
import React, { RefObject } from 'react'

const DownloadButton = ({
  reportRef,
}: {
  reportRef: RefObject<HTMLDivElement>
}) => {
  return (
    <button
      onClick={() => downloadPDF(reportRef)}
      className="mt-5 px-4 py-2 bg-purple-600 text-white rounded"
    >
      Download as PDF
    </button>
  )
}

export default DownloadButton
