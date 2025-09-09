'use client'
import { Invoice } from '@/utils/Interfaces/InvoiceInterface'
import React, { useState } from 'react'

interface Props {
  onClose: () => void
  onSave: (invoice: Invoice) => void
}

const CreateInvoiceModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Invoice, '_id'>>({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    approvalStatus: false,
    companyName: '',
    createdBy: '',
    financialYear: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as Invoice)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 relative">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Create New Invoice
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="createdBy"
            placeholder="Created By"
            value={formData.createdBy}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="financialYear"
            placeholder="Financial Year (e.g. 2025-2026)"
            value={formData.financialYear}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.approvalStatus}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  approvalStatus: e.target.checked,
                }))
              }
            />
            <label className="text-sm text-gray-600">Approved</label>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateInvoiceModal
