'use client'
import React, { useState } from 'react'
import InvoiceCard from './InvoiceCard'
import InvoiceFilters from './InvoiceFilters'
import CreateInvoiceModal from './InvoiceModal'
import { Invoice } from '@/utils/Interfaces/InvoiceInterface'
const InvoiceList = ({ Invoices }: { Invoices: Invoice[] }) => {
  // ✅ State for filters
  const [selectedCompany, setSelectedCompany] = useState<string>('All')
  const [selectedYear, setSelectedYear] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  // ✅ State for invoices
  const [invoices, setInvoices] = useState<Invoice[]>(Invoices)
  // ✅ State for modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  // ✅ Filter logic
  const filteredInvoices = invoices.filter((invoice) => {
    const companyMatch =
      selectedCompany === 'All' || invoice.companyName === selectedCompany
    const yearMatch =
      selectedYear === 'All' || invoice.financialYear === selectedYear
    const statusMatch =
      selectedStatus === 'All' ||
      (selectedStatus === 'Approved' && invoice.approvalStatus) ||
      (selectedStatus === 'Pending' && !invoice.approvalStatus)
    return companyMatch && yearMatch && statusMatch
  })
  // ✅ Handle adding a new invoice
  const handleAddInvoice = (newInvoice: Invoice) => {
    setInvoices((prev) => [
      ...prev,
      { ...newInvoice, id: Date.now().toString() },
    ])
  }
  return (
    <div className="min-h-screen  my-10 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center sm:text-left">
            Invoices Dashboard
          </h1>
        </div>
        <div className=" flex justify-between items-center">
          {/* ✅ Modal */}
          {isModalOpen && (
            <CreateInvoiceModal
              onClose={() => setIsModalOpen(false)}
              onSave={handleAddInvoice}
            />
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            + Create Invoice
          </button>
          <InvoiceFilters
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            selectedStatus={selectedStatus}
            selectedYear={selectedYear}
            setSelectedStatus={setSelectedStatus}
            setSelectedYear={setSelectedYear}
          />
        </div>
        {/* ✅ Responsive Grid for invoices */}
        {filteredInvoices.length === 0 ? (
          <p className="text-center text-gray-500 text-sm mt-6">
            No invoices found for the selected filters.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {filteredInvoices.map((invoice) => (
              <InvoiceCard invoice={invoice} key={invoice._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default InvoiceList
