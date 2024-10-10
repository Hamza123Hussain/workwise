import toast from 'react-hot-toast'

export const handleBreakStartEnd = async (
  onBreak: boolean,
  breakStartTime: Date | null,
  setBreakStartTime: (time: Date | null) => void,
  setOnBreak: (status: boolean) => void,
  breakDuration: number,
  setBreakDuration: (duration: number) => void
) => {
  const currentTime = new Date()

  if (!onBreak) {
    // Start Break
    setBreakStartTime(currentTime)
    setOnBreak(true)
    toast.success('Break started')
  } else {
    // End Break
    if (breakStartTime) {
      const breakEndTime = currentTime
      const breakTime =
        (breakEndTime.getTime() - breakStartTime.getTime()) / 1000 // in seconds
      setBreakDuration(breakDuration + breakTime)
      setBreakStartTime(null) // reset break start time after ending the break
      setOnBreak(false)
      toast.success('Break ended')
    } else {
      console.error('Break start time is missing.')
    }
  }
}
