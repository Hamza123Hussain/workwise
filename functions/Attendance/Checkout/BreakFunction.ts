import toast from 'react-hot-toast'
import { updateBreak } from './UpdateBreak'

export const handleBreakStartEnd = async (
  Email: string,
  onBreak: boolean,
  breakStartTime: Date | null,
  setBreakStartTime: (time: Date | null) => void,
  setOnBreak: (status: boolean) => void,
  breakDuration: number,
  setBreakDuration: (duration: number) => void,
  attendanceId: string
) => {
  const currentTime = new Date()
  const Data = await updateBreak(Email, attendanceId, onBreak, currentTime)

  if (!onBreak && Data) {
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
      const Data = await updateBreak(Email, attendanceId, onBreak, breakEndTime)
      if (Data) {
        console.log('BREAK DURATION : ', breakDuration)
        setBreakStartTime(null) // reset break start time after ending the break
        setOnBreak(false)
      }
      toast.success('Break ended')
    } else {
      console.error('Break start time is missing.')
    }
  }
}
