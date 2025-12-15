import React, { useEffect, useState } from 'react'

import InvoiceSummary from './InvoiceSummary'
import PaymentTable from './PaymentTable'
import Modal from './Modal'
import Buttons from './Buttons'
import { GetInvoices } from '@/functions/Invoices/GetInvoices'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'
// import Buttons from './Buttons'
const MainFinanceComponent = () => {
  const User = useSelector((state: RootState) => state.user)
  useEffect(() => {
    const AllPayments = async () => {
      const Data = await GetInvoices(User._id)
      if (Data) {
        SetPayments(Data)
      }
    }
    AllPayments()
  }, [User._id])
  const [Payments, SetPayments] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className=" flex flex-col gap-3 px-3">
      <InvoiceSummary Payments={Payments} />
      <hr className=" w-full" />
      <div className=" flex justify-between px-5">
        <h3 className=" text-[20px] text-[#001A67] font-bold">Invoices</h3>
        <Buttons setIsModalOpen={setIsModalOpen} />
      </div>
      <PaymentTable Payments={Payments} />
      {isModalOpen && (
        <Modal
          Payments={Payments}
          setPayments={SetPayments}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  )
}
export default MainFinanceComponent
