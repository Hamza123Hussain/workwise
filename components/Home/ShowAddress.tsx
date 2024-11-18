import { LocationCoords } from '@/utils/AttendanceInterface'
import { FaCompass, FaMapMarkedAlt } from 'react-icons/fa'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

const ShowAddress = ({ location }: { location: LocationCoords }) => {
  // Ensure that the location's coordinates are passed correctly as an array.
  const position: [number, number] = [location.latitude, location.longitude] // Coordinate position for the map

  // Custom icon for marker
  const customIcon = new Icon({
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

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

      <div className="mt-6 h-64">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full rounded-lg shadow-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Corrected Marker component */}
          <Marker position={position} icon={customIcon}>
            <Popup>{location.location}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default ShowAddress
