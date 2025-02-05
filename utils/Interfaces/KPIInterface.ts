export interface Kpi {
  UserId: string // Reference to the User ID
  UserEmail: string // Email of the User
  UserName: string // Name of the User
  Targets: Target[] // Array of target objects
  PointsGained: number // Total points gained
  TotalPoints: number // Total available points
  createdAt?: Date // Timestamp for when the document was created
  updatedAt?: Date // Timestamp for when the document was last updated
  Salary: number
  HoursWorked: number
  _id: string
}

export interface Target {
  TargetName: string // Name of the target
  TargetValue: number // Value required to achieve the target
  TargetAchieved: boolean // Whether the target has been achieved
  ValueAchieved: number // Value achieved so far
  AchievedOn?: Date // Date the target was achieved
  Priority: 'High' | 'Medium' | 'Low' // Priority of the target
  PointsGained: number // Points gained for this target
  TotalPoints: number // Total points available for this target
}

export interface TargetFetched {
  TargetName: string // Name of the target
  TargetValue: number // Value required to achieve the target
  TargetAchieved: boolean // Whether the target has been achieved
  ValueAchieved: number // Value achieved so far
  Priority: 'High' | 'Medium' | 'Low' // Priority of the target
  PointsGained: number // Points gained for this target
  TotalPoints: number // Total points available for this target
}
