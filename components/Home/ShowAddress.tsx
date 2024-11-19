import { FC } from 'react'
import dynamic from 'next/dynamic'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LocationCoords } from '@/utils/AttendanceInterface'

// Dynamically import the MapContainer and other React-Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
})

interface MapComponentProps {
  location: LocationCoords
}

const MapComponent: FC<MapComponentProps> = ({ location }) => {
  const position: [number, number] = [location.latitude, location.longitude]

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
          <p>
            <span className="font-semibold">Latitude:</span> {location.latitude}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-gray-100 text-md mt-3">
          <p>
            <span className="font-semibold">Longitude:</span>{' '}
            {location.longitude}
          </p>
        </div>
      </div>

      <div className="mt-6 h-64">
        {/* MapContainer with Leaflet */}
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
          <Marker position={position} icon={customIcon}>
            <Popup>{location.location}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default MapComponent
