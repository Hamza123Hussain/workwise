import axios from 'axios'
import { setKpis } from '@/utils/Redux/Slice/kpi/KpiListSlice'
import Store from '@/utils/Redux/Store/Store'
// Base API URL
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'https://workwise-backend-puce.vercel.app'
/**
 * Create KPI
 * @param data - KPI payload { UserId, Targets, HoursWorked, Salary }
 */
export const createKPI = async (data: any) => {
  try {
    const res = await axios.post(`${API_BASE}/Api/KPI/CreateNewKPI`, data)
    console.log('Create KPI response:', res.data)
    const newKPI = res.data.KPI
    // Update Redux store immediately
    const currentKpis = Store.getState().KpiList || []
    Store.dispatch(setKpis([newKPI, ...currentKpis]))
    console.log('New KPI created:', newKPI)
    return { success: true, KPI: newKPI }
  } catch (error: any) {
    console.error('Create KPI error:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    }
  }
}

export const updateKPI = async (kpiId: string, data: any) => {
  try {
    const res = await axios.put(
      `${API_BASE}/Api/KPI/UpdateKPI?KPIId=${kpiId}`,
      data,
    )
    const updatedKPI = res.data.KPI

    // Update Redux store: replace the old KPI with updated one
    const currentKpis = Store.getState().KpiList || []
    const newKpis = currentKpis.map((kpi: any) =>
      kpi._id === kpiId ? updatedKPI : kpi,
    )
    Store.dispatch(setKpis(newKpis))

    return { success: true, KPI: updatedKPI }
  } catch (error: any) {
    console.error('Update KPI error:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    }
  }
}
