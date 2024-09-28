export interface AttendanceRecord {
  id: string // Unique identifier for the record (UUID)
  userData: string // User identifier (string)
  entry: Date // Date and time of entry (Date object)
  currentDate: Date // Current date and time (Date object)
  isAbsent: boolean // Indicates whether the user is absent (boolean)
  exit: Date // Date and time of exit (Date object)
}
