export function convertHoursToString(hoursWorked: number) {
  // Calculate total seconds
  const totalSeconds = hoursWorked * 3600

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  // Return the formatted string
  return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
}
