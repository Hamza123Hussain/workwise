import React from 'react'

const Loader = () => {
  return (
    <div className="loader flex items-center justify-center rounded-full shadow-xl w-36 h-36 border border-purple-black">
      <span className="absolute top-1/2 left-1/2 w-1/2 h-full bg-purpleGradientStart transform origin-top-left animate-spin"></span>
    </div>
  )
}

export default Loader
