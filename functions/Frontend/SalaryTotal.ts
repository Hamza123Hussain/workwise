// utils/calculateTotalSalary.ts (or .js if you're not using TypeScript)

import { MergedUserData } from '@/utils/Report_Interface'

export const calculateTotalSalary = (mergedData: MergedUserData[]) => {
  return mergedData.reduce((acc, item) => {
    // Ensure salary is a number
    const salary = parseInt(item.salary) || 0

    // Calculate the total task completion percentage
    const taskCompletion = item.tasks.reduce(
      (taskAcc, task) => taskAcc + (task.TaskCompletion || 0),
      0
    )

    // Calculate total hours worked for attendance percentage
    const totalHoursWorked = item.attendance.reduce(
      (attendanceAcc, attendance) => attendanceAcc + attendance.Hours_Worked,
      0
    )

    // Avoid division by zero
    const taskCompletionPercentage =
      item.tasks.length > 0 ? taskCompletion / item.tasks.length / 100 : 0
    const attendancePercentage = totalHoursWorked / 184 // Assuming 184 is the full attendance hours

    // Calculate the final salary adjustment
    const salaryAdjustment =
      (taskCompletionPercentage + attendancePercentage) / 2

    return acc + salary * salaryAdjustment
  }, 0)
}
