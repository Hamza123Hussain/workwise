// Redux Toolkit provides helpers like createSlice, createAsyncThunk, PayloadAction
import { Invoice } from '@/utils/Interfaces/InvoiceInterface'
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// Axios is used for making HTTP requests to our backend API
import axios from 'axios'
// ✅ State type - defines what the invoice state will look like in Redux
interface InvoiceState {
  invoices: Invoice[] // List of all invoices
  loading: boolean // Whether an API request is currently in progress
  error: string | null // Holds error message if an API request fails
}
// ======================= INITIAL STATE =======================
// This is the default state for invoices before any data is loaded
const initialState: InvoiceState = {
  invoices: [], // Start with an empty list
  loading: false, // No API request in progress initially
  error: null, // No error initially
}
// ======================= ASYNC THUNKS =======================
// Async thunks allow us to perform async tasks (like API calls)
// and automatically handle pending/fulfilled/rejected states
// ✅ Fetch all invoices from the backend API
export const fetchInvoices = createAsyncThunk(
  'invoices/fetchInvoices', // Action type
  async (_, { rejectWithValue }) => {
    try {
      // GET request to fetch all invoices
      const res = await axios.get<Invoice[]>('/api/invoices')
      return res.data // Data returned will be passed to reducers
    } catch (err) {
      // If API fails, reject with error message
      return rejectWithValue(err || 'Failed to fetch invoices')
    }
  }
)
// ✅ Create a new invoice and send it to the backend
export const createInvoice = createAsyncThunk(
  'invoices/createInvoice',
  async (
    // Omit<Invoice, 'id'> means we send invoice details but leave out "id" (backend usually generates it)
    newInvoice: Omit<Invoice, 'id'>,
    { rejectWithValue }
  ) => {
    try {
      // POST request to create a new invoice
      const res = await axios.post<Invoice>('/api/invoices', newInvoice)
      return res.data
    } catch (err) {
      return rejectWithValue(err || 'Failed to create invoice')
    }
  }
)
// ✅ Update the approvalStatus of an existing invoice
// Only updates `approvalStatus` field (Approved / Pending)
export const updateInvoiceStatus = createAsyncThunk(
  'invoices/updateInvoiceStatus',
  async (
    { id, approvalStatus }: { id: string; approvalStatus: boolean }, // Params we need
    { rejectWithValue }
  ) => {
    try {
      // PATCH request to update invoice status
      const res = await axios.patch<Invoice>(`/api/invoices/${id}`, {
        approvalStatus,
      })
      return res.data
    } catch (err) {
      return rejectWithValue(err || 'Failed to update invoice')
    }
  }
)
// ======================= SLICE =======================
// A "slice" is a collection of reducer logic + actions for a specific feature
export const invoiceSlice = createSlice({
  name: 'invoices', // Slice name (used in Redux DevTools and action types)
  initialState, // Our initial state
  reducers: {}, // Standard reducers (not needed here since we use async thunks)
  extraReducers: (builder) => {
    // ======================= FETCH INVOICES =======================
    builder.addCase(fetchInvoices.pending, (state) => {
      // When fetching starts → show loading
      state.loading = true
      state.error = null
    })
    builder.addCase(
      fetchInvoices.fulfilled,
      (state, action: PayloadAction<Invoice[]>) => {
        // When fetching succeeds → update state with invoices
        state.loading = false
        state.invoices = action.payload
      }
    )
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      // When fetching fails → stop loading and store error
      state.loading = false
      state.error = action.payload as string
    })
    // ======================= CREATE INVOICE =======================
    builder.addCase(
      createInvoice.fulfilled,
      (state, action: PayloadAction<Invoice>) => {
        // When new invoice is created → add to state list
        state.invoices.push(action.payload)
      }
    )
    // ======================= UPDATE STATUS =======================
    builder.addCase(
      updateInvoiceStatus.fulfilled,
      (state, action: PayloadAction<Invoice>) => {
        // Find the invoice in our state array
        const index = state.invoices.findIndex(
          (inv) => inv._id === action.payload._id
        )
        if (index !== -1) {
          // Replace the old invoice with the updated one
          state.invoices[index] = action.payload
        }
      }
    )
  },
})
