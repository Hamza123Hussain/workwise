import { downloadPDF } from '@/utils/DownloadPDF'
import React, { RefObject } from 'react'

const DownloadButton = ({
  reportRef,
  text,
}: {
  reportRef: RefObject<HTMLDivElement>
  text: string
}) => {
  return (
    <button
      onClick={() => downloadPDF(reportRef, text)}
      className="mt-5 px-4 py-2 text-white rounded bg-[#b473ff]"
    >
      Download as PDF
    </button>
  )
}

export default DownloadButton
