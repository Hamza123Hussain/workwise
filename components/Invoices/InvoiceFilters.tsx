import React from 'react'
const InvoiceFilters = ({
  selectedCompany,
  setSelectedCompany,
  selectedYear,
  setSelectedYear,
  selectedStatus,
  setSelectedStatus,
}: {
  selectedCompany: string
  setSelectedCompany: (company: string) => void
  selectedYear: string
  setSelectedYear: (year: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
}) => {
  // ✅ Extract unique values for dropdowns
  const companies = ['All', 'Global Grads', 'Octtoppus', 'PowerPulse']
  const years = ['All', '2025-2026', '2026-2027', '2027-2028']
  const statuses = ['All', 'Approved', 'Pending']
  return (
    <div className="shadow-sm rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4 md:items-center justify-end">
      {/* Company Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Company
        </label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
        >
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>
      {/* Year Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Year
        </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
        >
          {years.map((year: string) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full md:w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-400"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default InvoiceFilters
