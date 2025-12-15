import React from 'react'

const InvoiceSummary = ({ Payments }: { Payments: any }) => {
  const Paid = Payments.filter(
    (payment: any) => payment.Status.toLowerCase() === 'paid'
  ).length
  const UnPaid = Payments.filter(
    (payment: any) => payment.Status.toLowerCase() === 'unpaid'
  ).length
  const TotalAmountReceived = Payments.reduce((total: number, payment: any) => {
    return total + parseFloat(payment.Amount)
  }, 0)
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-[20px] p-2 ">
      <div className=" rounded-[20px] p-[10px] bg-[#EFF4FF] flex flex-col">
        <h4 className=" text-[16px] font-medium text-[#475467]">
          Paid Invoices
        </h4>
        <h3 className=" text-[64px] text-[#6D3DF1]">{Paid}</h3>
      </div>
      <div className=" rounded-[20px] p-[10px] bg-[#EFF4FF] flex flex-col">
        <h4 className=" text-[16px] font-medium text-[#475467]">
          UnPaid Invoices
        </h4>
        <h3 className=" text-[64px] text-[#F13D7F]"> {UnPaid}</h3>
      </div>
      <div className=" rounded-[20px] p-[10px] bg-[#EFF4FF] flex flex-col">
        <h4 className=" text-[16px] font-medium text-[#475467]">
          Amount Recieved
        </h4>
        <div className=" flex items-center">
          <sup className=" text-[24px] text-[#0DB230] font-bold">PKR</sup>
          <h3 className=" text-[64px] text-[#0DB230]">{TotalAmountReceived}</h3>
        </div>
      </div>
      <div className=" rounded-[20px] p-[10px] bg-[#EFF4FF] flex flex-col">
        <h4 className=" text-[16px] font-medium text-[#475467]">Amount Due</h4>
        <div className=" flex items-center">
          <sup className=" text-[24px] text-[#D70808] font-bold">PKR</sup>
          <h3 className=" text-[64px] text-[#D70808]">156,000</h3>
        </div>
      </div>
    </div>
  )
}

export default InvoiceSummary
