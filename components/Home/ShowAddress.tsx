import { LocationCoords } from '@/utils/AttendanceInterface'
import { FaCompass, FaMapMarkedAlt } from 'react-icons/fa'

const ShowAddress = ({ location }: { location: LocationCoords }) => {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 p-6 rounded-lg mt-5 shadow-xl transition-transform transform hover:scale-105 max-w-lg mx-auto">
      <h1 className="text-3xl font-extrabold text-white">Your Address</h1>
      <p className="text-white text-lg mt-2">{location.location}</p>

      <div className="mt-6">
        <div className="flex items-center space-x-2 text-gray-100 text-md">
          <FaCompass className="text-yellow-300" />
          <p>
            <span className="font-semibold">Latitude:</span> {location.latitude}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-gray-100 text-md mt-3">
          <FaMapMarkedAlt className="text-blue-300" />
          <p>
            <span className="font-semibold">Longitude:</span>{' '}
            {location.longitude}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShowAddress
