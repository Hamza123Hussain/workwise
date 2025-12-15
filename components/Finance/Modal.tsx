import { createInvoice } from '@/functions/Invoices/CreateInvoice'
import { RootState } from '@/utils/Redux/Store/Store'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
const Modal = ({ Payments, setPayments, setIsModalOpen }: any) => {
  const User = useSelector((state: RootState) => state.user)
  // Generate next 3 financial years
  const getFinancialYears = () => {
    const years = []
    const currentYear = new Date().getFullYear()

    for (let i = 0; i < 3; i++) {
      const fyStart = currentYear + i
      const fyEnd = fyStart + 1
      years.push(`${fyStart}-${fyEnd}`)
    }
    return years
  }

  const financialYears = getFinancialYears()

  const [newPayment, setNewPayment] = useState({
    InvoiceNumber: '',
    Customer: '',
    CreatedOn: new Date().toISOString().split('T')[0], // current date,
    Status: '',
    CreatedBy: User.Name, // Optional field for who created the Invoice
    FinancialYear: '',
    PaymentMode: '',
    Amount: 0,
    PaidTo: '',
  })

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(true)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const CreateNewInvoice = await createInvoice(User._id, newPayment)
    console.log('Created Invoice:', CreateNewInvoice)

    setPayments([...Payments, newPayment])

    setShowModal(false)

    setTimeout(() => setIsModalOpen(false), 300)
  }

  const handleClose = () => {
    setShowModal(false)
    setTimeout(() => setIsModalOpen(false), 300)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        showModal ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white max-h-96 overflow-y-auto rounded-lg w-full max-w-lg p-6 relative transform transition-all duration-300 ${
          showModal
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-10 opacity-0 scale-95'
        } shadow-xl`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors duration-200"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-blue-600">
          Add New Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="InvoiceNumber"
            value={newPayment.InvoiceNumber}
            onChange={handleChange}
            placeholder="Invoice #"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07] focus:outline-none"
            required
          />

          <input
            name="Customer"
            value={newPayment.Customer}
            onChange={handleChange}
            placeholder="Customer Name"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07]"
            required
          />

          <input
            name="Amount"
            value={newPayment.Amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07]"
            required
          />

          <select
            name="FinancialYear"
            value={newPayment.FinancialYear}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          >
            {financialYears.map((fy) => (
              <option key={fy}>{fy}</option>
            ))}
          </select>

          <input
            name="PaymentMode"
            value={newPayment.PaymentMode}
            onChange={handleChange}
            placeholder="Payment Mode"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07]"
            required
          />

          <select
            name="Status"
            value={newPayment.Status}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="paid">paid</option>
            <option value="unpaid">unpaid</option>
            <option value="Partially Paid">Partially Paid</option>
          </select>

          <select
            name="PaidTo"
            value={newPayment.PaidTo}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
            required
          >
            <option value="">Select Company</option>
            <option value="Global Grads">Global Grads</option>
            <option value="PowerPulse">PowerPulse</option>
            <option value="Octtoppus">Octtoppus</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-[#4a2205] transition-all duration-200 transform hover:scale-105"
          >
            Add Payment
          </button>
        </form>
      </div>
    </div>
  )
}

export default Modal
