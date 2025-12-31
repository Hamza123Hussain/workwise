import React from 'react'

const PaymentTable = ({ Payments }: { Payments: any }) => {
  return (
    <div className="w-full mt-2 border mb-4 border-[#E2E4E6] rounded-sm bg-white shadow-md shadow-black ">
      {/* ---------- TABLE HEADER ---------- */}
      <div className="bg-[#F7F8F9] px-4 py-2 grid grid-cols-8 font-medium text-sm ">
        <span>Invoice #</span>
        <span>Customer</span>
        <span>Created On</span>
        <span>Amount</span>
        <span>Payment Mode</span>
        <span>Status</span>
        <span>Paid To</span>
        <span>CreatedBy</span>
      </div>

      {/* ---------- TABLE ROWS ---------- */}
      <div className="flex flex-col divide-y divide-gray-200">
        {Payments.map((payment: any) => {
          const statusColor =
            payment.Status?.toLowerCase() === 'paid'
              ? 'bg-[#0DB231]'
              : payment.Status?.toLowerCase() === 'unpaid'
              ? 'bg-[#D70808]'
              : 'bg-[#2160FF]' // Partially Paid

          // Format date cleanly -> e.g., "12 Jan 2025"
          const formattedDate = payment.CreatedOn
            ? new Date(payment.CreatedOn).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })
            : ''

          return (
            <div
              key={payment.InvoiceNumber}
              className="px-4 py-2 grid grid-cols-8 items-center text-sm"
            >
              <span>{payment.InvoiceNumber}</span>
              <span>{payment.Customer}</span>
              <span>{formattedDate}</span>
              <span>{payment.Amount}</span>
              <span>{payment.PaymentMode}</span>

              <span
                className={`p-2 rounded-lg text-white text-xs font-semibold w-5/6 ${statusColor}`}
              >
                {payment.Status}
              </span>

              <span>{payment.PaidTo}</span>
              <span>{payment.CreatedBy}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PaymentTable
