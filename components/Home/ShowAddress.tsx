import { LocationCoords } from '@/utils/AttendanceInterface'
import React from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'

const ShowAddress = ({ location }: { location: LocationCoords }) => {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 p-6 rounded-lg mt-5 shadow-xl max-w-lg mx-auto">
      <h1 className="text-3xl font-extrabold text-white">Your Address</h1>
      <p className="text-white text-lg mt-2">{location.location}</p>

      <div className="mt-6">
        <div className="text-gray-100 text-md">
          <p>
            <span className="font-semibold">Latitude:</span> {location.latitude}
          </p>
          <p>
            <span className="font-semibold">Longitude:</span>{' '}
            {location.longitude}
          </p>
        </div>
      </div>

      <div className="mt-6 h-64">
        <ComposableMap>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  )
}

export default ShowAddress
