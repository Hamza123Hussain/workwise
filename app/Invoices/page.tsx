'use client'
import InvoiceList from '@/components/Invoices/InvoiceUi'
import { fetchInvoices } from '@/utils/Redux/Slice/InvoiceSlice/InvoiceSlice'
import { AppDispatch, RootState } from '@/utils/Redux/Store/Store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Invoices = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { invoices, loading } = useSelector((state: RootState) => state.Invoice)

  // Fetch invoices on load
  useEffect(() => {
    dispatch(fetchInvoices())
  }, [dispatch])

  return (
    <>
      {' '}
      {loading && <p>Loading...</p>}
      <InvoiceList Invoices={invoices} />
    </>
  )
}

export default Invoices
