export interface AttendanceRecord {
  id: string // Unique identifier for the record (UUID)
  UserData: string // User identifier (string)
  entry: Date // Date and time of entry (Date object)
  currentDate: Date // Current date and time (Date object)
  isAbsent: boolean // Indicates whether the user is absent (boolean)
  exit: Date // Date and time of exit (Date object)
  Hours_Worked: number

  Break_Time: number
}
export const ApiUrl = 'https://workwise-backend-puce.vercel.app/'
export type LocationCoords = {
  latitude: number
  longitude: number
}
