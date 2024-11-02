import { MergedUserData } from '@/utils/Report_Interface'
import { getUserSalary } from '../AUTH/GetSalary'

export const countPriorityTasks = (
  tasks: { priority: string }[],
  priority: string
): number => {
  return tasks.reduce((acc, element) => {
    return element.priority === priority ? acc + 1 : acc
  }, 0)
}

export const calculateTotalTaskCompletion = (
  tasks: { TaskCompletion: number }[]
): number => {
  return tasks.reduce((acc, element) => acc + element.TaskCompletion, 0)
}

export const calculateTotalHoursWorked = (
  attendance: { Hours_Worked: number }[]
): number => {
  return attendance.reduce((acc, element) => acc + element.Hours_Worked, 0)
}

export const calculateAttendancePercentage = (
  totalHoursWorked: number
): string => {
  return ((totalHoursWorked / 184) * 100).toFixed(2)
}

export const getSalary = (
  salaries: Record<string, number>,
  user: string
): number => {
  return salaries[user] || 0
}

export const calculateOverallAverage = (
  attendancePercentage: string,
  taskCompletionPercentage: number
): number => {
  return (parseFloat(attendancePercentage) + taskCompletionPercentage) / 2
}

export const calculateOverallSalary = (
  overallAverage: number,
  salary: number
): number => {
  return overallAverage > 0 ? (overallAverage / 100) * salary : 0
}

export const fetchSalaries = async (mergedData: MergedUserData[]) => {
  const salaryData: { [key: string]: number } = {}

  for (const userData of mergedData) {
    const salary = await getUserSalary(userData.user)
    salaryData[userData.user] = salary
  }

  return salaryData
}
