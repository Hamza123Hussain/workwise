import axios from 'axios'

export const updateKPI = async (UserId: string, TargetName: string) => {
  try {
    // ✅ Input Validation
    if (!UserId || !TargetName) {
      throw new Error('Missing required fields: UserId, _id, or TargetName')
    }

    // ✅ Send API Request
    const response = await axios.put(
      `https://workwise-backend-puce.vercel.app/Api/KPI/UpdateKPI`,
      { UserId, TargetName },
      { headers: { 'Content-Type': 'application/json' } } // Ensure JSON request
    )

    // ✅ Success Response
    return {
      success: true,
      message: response.data.message,
      updatedKPI: response.data.updatedKPI,
    }
  } catch (error) {
    // ❌ Improved Error Handling
    return {
      success: false,
      message: error || 'Failed to update KPI. Try again!',
      error: error,
    }
  }
}
