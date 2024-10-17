import { LocationCoords } from './AttendanceInterface'

export interface CheckInProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  currentTime: Date
  checkinStatus: boolean
  attendanceId: string | null
  setAttendanceId: (id: string | null) => void
  setCheckinStatus: (status: boolean) => void
  setLocation: (currentlocation: LocationCoords) => void
}
