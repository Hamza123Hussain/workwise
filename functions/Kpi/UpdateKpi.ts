import axios from 'axios'

export const updateKPI = async (UserId: string, TargetName: string) => {
  try {
    if (!UserId || TargetName === '') {
      throw new Error('Missing required fields')
    }

    const response = await axios.put(
      `https://workwise-backend-puce.vercel.app/Api/KPI/UpdateKpiForTaskBoard`,
      { UserId, TargetName },
      { headers: { 'Content-Type': 'application/json' } },
    )

    return {
      success: true,
      data: response.data.updatedKPI,
      message: response.data.message,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || 'Failed to update KPI',
    }
  }
}
