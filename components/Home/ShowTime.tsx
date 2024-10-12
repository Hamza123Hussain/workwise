import React from 'react'

const ShowTime = ({ currentTime }: { currentTime: Date }) => {
  return (
    <>
      <p className="font-bold text-white">
        Date:
        <span className="text-lg text-white">
          {' '}
          {currentTime.toLocaleDateString()}
        </span>
      </p>
      <p className="font-bold text-white">
        Current Time:
        <span className="text-lg text-white">
          {' '}
          {currentTime.toLocaleTimeString()}
        </span>
      </p>
    </>
  )
}

export default ShowTime
