import React, { useState, useEffect } from 'react'

const Modal = ({
  Payments,
  setPayments,
  setIsModalOpen,
}: {
  Payments: any
  setPayments: any
  setIsModalOpen: any
}) => {
  const [newPayment, setNewPayment] = useState({
    ID: '',
    Name: '',
    Createdon: '',
    Amount: '',
    Paid: '',
    PaymentMode: '',
    Status: '',
    PaidTo: '',
  })

  // For smooth mount/unmount animation
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    setShowModal(true)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewPayment({ ...newPayment, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPayments([...Payments, newPayment])
    setNewPayment({
      ID: '',
      Name: '',
      Createdon: '',
      Amount: '',
      Paid: '',
      PaymentMode: '',
      Status: '',
      PaidTo: '',
    })
    setShowModal(false)
    setTimeout(() => setIsModalOpen(false), 300) // wait for animation
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
        className={`bg-white rounded-lg w-full max-w-lg p-6 relative transform transition-all duration-300 ${
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
            name="ID"
            value={newPayment.ID}
            onChange={handleChange}
            placeholder="Invoice #"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07] focus:outline-none transition"
            required
          />
          <input
            name="Name"
            value={newPayment.Name}
            onChange={handleChange}
            placeholder="Customer Name"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07] focus:outline-none transition"
            required
          />
          <input
            name="Amount"
            value={newPayment.Amount}
            onChange={handleChange}
            placeholder="Amount"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07] focus:outline-none transition"
            required
          />
          <input
            name="Paid"
            value={newPayment.Paid}
            onChange={handleChange}
            placeholder="Paid"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07] focus:outline-none transition"
            required
          />
          <input
            name="PaymentMode"
            value={newPayment.PaymentMode}
            onChange={handleChange}
            placeholder="Payment Mode"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07] focus:outline-none transition"
            required
          />
          <select
            name="Status"
            value={newPayment.Status}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07] focus:outline-none transition"
            required
          >
            <option value="">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Partially Paid">Partially Paid</option>
          </select>
          <select
            name="PaidTo"
            value={newPayment.PaidTo}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-[#5A2A07] focus:outline-none transition"
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
