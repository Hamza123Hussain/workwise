// Function to format duration into HH:mm:ss
export const formatDuration = (timeDifference: number) => {
  const hours = Math.floor(timeDifference / (1000 * 60 * 60))
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

  return `${hours} hours ${minutes} mins ${seconds} secs`
}

export const calculateRemainingTime = (timeDifference: number) => {
  const targetHours = 8 // Assuming an 8-hour workday in hours
  const targetMilliseconds = targetHours * 60 * 60 * 1000 // Convert target hours to milliseconds

  const remainingMilliseconds = Math.max(targetMilliseconds - timeDifference, 0)

  const remainingHours = Math.floor(remainingMilliseconds / (1000 * 60 * 60))
  const remainingMinutes = Math.floor(
    (remainingMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  )
  const remainingSeconds = Math.floor(
    (remainingMilliseconds % (1000 * 60)) / 1000
  )

  return `${remainingHours} hrs ${remainingMinutes} mins ${remainingSeconds} secs`
}
