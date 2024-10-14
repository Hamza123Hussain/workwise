export const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number
) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  )
  const data = await response.json()
  console.log('Address:', data.display_name)
}
