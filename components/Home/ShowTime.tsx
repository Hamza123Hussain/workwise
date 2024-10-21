import React from 'react'

const ShowTime = ({ currentTime }: { currentTime: Date }) => {
  return (
    <div className=" flex justify-between">
      {' '}
      <p className="font-bold text-[#a078ff]">
        Current Time:
        <span className="text-lg text-[#a078ff]">
          {' '}
          {currentTime.toLocaleTimeString()}
        </span>
      </p>
      <p className="font-bold text-[#a078ff]">
        Date:
        <span className="text-lg text-[#a078ff]">
          {' '}
          {currentTime.toLocaleDateString()}
        </span>
      </p>
    </div>
  )
}

export default ShowTime
