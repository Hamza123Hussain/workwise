import React from 'react'
import './style.css'

const Loader = ({
  ballColor1 = 'purple',
  ballColor2 = '#ff79da',
  size = 30,
  animationSpeed = 1000,
}) => {
  return (
    <div className="loader">
      <div className="loader__balls">
        {Array.from({ length: 3 }).map((_, groupIndex) => (
          <div className="loader__balls__group" key={groupIndex}>
            {Array.from({ length: 3 }).map((_, ballIndex) => (
              <div
                key={ballIndex}
                className={`ball item${ballIndex + 1}`}
                style={{
                  backgroundColor:
                    groupIndex % 2 === 0 ? ballColor1 : ballColor2,
                  height: size,
                  width: size,
                  animationDuration: `${animationSpeed}ms`,
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loader
