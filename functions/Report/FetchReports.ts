import { ApiUrl } from '@/utils/Interfaces/AttendanceInterface'
import { NewReport } from '@/utils/Interfaces/NewReportInterface'
import axios from 'axios'

// Function to fetch all reports
export const fetchReports = async (
  Email: string,
  setReports: (report: NewReport[]) => void,
  setFilteredReports: (report: NewReport[]) => void,
  setError: (error: string) => void,
  setLoading: (loading: boolean) => void
) => {
  try {
    const response = await axios.get<NewReport[]>(
      `${ApiUrl}Api/Report/AllReports?email=${Email}`
    )
    setReports(response.data)
    setFilteredReports(response.data) // Initialize filteredReports with all reports
  } catch (err) {
    setError('Failed to fetch reports')
    console.error(err)
  } finally {
    setLoading(false)
  }
}
