export interface NewReport {
  _id: string
  UserID: string
  UserName: string
  TotalTasks: number
  TaskPercentage: number
  AttendancePercentage: number
  PerformancePercentage: number
  HighPriorityTask: number
  mediumPriorityTask: number
  lowPriorityTask: number
  HighPrioritpoints: number
  MediumPrioritypoints: number
  LowPriorityPoints: number
  Total_HighPrioritpoints: number
  Total_MediumPrioritypoints: number
  Total_LowPriorityPoints: number
  PointsGained: number
  TotalPoints: number
  TotalHours: number
  HoursWorked: number
  Salary: number
  Month: string
}
