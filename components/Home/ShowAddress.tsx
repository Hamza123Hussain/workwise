import { LocationCoords } from '@/utils/AttendanceInterface'

// showAddress.tsx
const ShowAddress = ({ location }: { location: LocationCoords }) => {
  return (
    <div className="bg-[#a078ff] p-6 rounded-lg mt-5 shadow-lg transition-transform transform hover:scale-105">
      <h1 className="text-3xl font-bold text-white">Your Address</h1>
      <p className="text-white text-lg mt-2">{location.location}</p>
      <div className="mt-4">
        <p className="text-gray-100 text-md">
          <span className="font-semibold">Latitude:</span> {location.latitude}
        </p>
        <p className="text-gray-100 text-md">
          <span className="font-semibold">Longitude:</span> {location.longitude}
        </p>
      </div>
    </div>
  )
}

export default ShowAddress
