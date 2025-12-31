import React, { useEffect, useState } from 'react'
import InvoiceSummary from './InvoiceSummary'
import PaymentTable from './PaymentTable'
import Modal from './Modal'
import Buttons from './Buttons'
import { GetInvoices } from '@/functions/Invoices/GetInvoices'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/Redux/Store/Store'

const MainFinanceComponent = () => {
  const User = useSelector((state: RootState) => state.user)
  const [Payments, SetPayments] = useState<any[]>([])
  const [filteredPayments, SetFilteredPayments] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const AllPayments = async () => {
      const Data = await GetInvoices(User._id)
      if (Data) {
        SetPayments(Data)
        SetFilteredPayments(Data)
      }
    }
    AllPayments()
  }, [User._id])

  // Sorting handler
  const handleSort = (value: string) => {
    if (value === '') {
      SetFilteredPayments(Payments)
      return
    }
    const sorted = [...Payments].filter(
      (p) => p.PaidTo === value // Sort by CreatedBy as example
    )
    SetFilteredPayments(sorted)
  }

  return (
    <div className="flex flex-col gap-3 px-3">
      <InvoiceSummary Payments={filteredPayments} />
      <hr className="w-full" />
      <div className="flex justify-between px-5">
        <h3 className="text-[20px] text-[#001A67] font-bold">Invoices</h3>
        <Buttons setIsModalOpen={setIsModalOpen} handleSort={handleSort} />
      </div>
      <PaymentTable Payments={filteredPayments} />
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
