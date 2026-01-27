// frontend/functions/Kpi/DeleteKpi.ts
import axios from 'axios'

export const deleteKPI = async (UserID: string, _id: string) => {
  try {
    const res = await axios.delete(
      `https://workwise-backend-puce.vercel.app/Api/KPI/DeleteKpi?UserID=${UserID}&_id=${_id}`,
    )
    return res.data // { success: true, message: "KPI deleted successfully" }
  } catch (error: any) {
    console.error('Delete KPI error:', error.response?.data || error.message)
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    }
  }
}
