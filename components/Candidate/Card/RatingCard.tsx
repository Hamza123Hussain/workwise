import React from 'react'
import { RiStarFill } from 'react-icons/ri'
const RatingCard = ({ Rating }: { Rating: number }) => {
  const getRatingColor = (rating: number) => {
    if (rating <= 2) return 'text-red-500'
    if (rating === 3) return 'text-orange-500'
    return 'text-yellow-500'
  }
  return (
    <div className="flex items-center justify-center mt-4">
      {Rating > 0 ? (
        <>
          <RiStarFill className={`mr-2 ${getRatingColor(Rating)}`} size={20} />
          <span className={`${getRatingColor(Rating)}`}>
            Rating: {Rating} / 5
          </span>
        </>
      ) : (
        ''
      )}
    </div>
  )
}

export default RatingCard
