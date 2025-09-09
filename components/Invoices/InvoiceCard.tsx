import { Invoice } from '@/utils/Interfaces/InvoiceInterface'
import { CheckCircle, Clock } from 'lucide-react'
import React from 'react'
const InvoiceCard = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div
      key={invoice._id}
      className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
    >
      {/* Title + description */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
          {invoice.title}
        </h2>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {invoice.description}
        </p>
      </div>
      {/* Invoice meta details */}
      <div className="mt-5 space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Company:</span> {invoice.companyName}
        </p>
        <p>
          <span className="font-medium">Year:</span> {invoice.financialYear}
        </p>
        <p>
          <span className="font-medium">Date:</span>{' '}
          {new Date(invoice.date).toLocaleDateString()}
        </p>
      </div>
      {/* Status + action */}
      <div className="mt-6 flex items-center justify-between">
        <span
          className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${
            invoice.approvalStatus
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {invoice.approvalStatus ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <Clock className="w-4 h-4" />
          )}
          {invoice.approvalStatus ? 'Approved' : 'Pending'}
        </span>
        {/* <button className="px-4 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition">
          View Details
        </button> */}
      </div>
    </div>
  )
}
export default InvoiceCard
