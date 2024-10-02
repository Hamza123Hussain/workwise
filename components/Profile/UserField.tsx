import Image from 'next/image'
import React from 'react'
const UserField = ({
  Name,
  Attribute,
}: {
  Name: string
  Attribute: string | number
}) => {
  return (
    <div className="flex flex-col items-center justify-between border-b border-gray-700 pb-3">
      <h1 className="text-lg font-semibold text-purple-300">{Name}</h1>
      {Name !== 'User Image' ? (
        <h1 className="text-lg font-medium text-gray-100">{Attribute}</h1>
      ) : (
        typeof Attribute === 'string' && (
          <Image
            src={Attribute}
            width={60}
            height={60}
            alt="User Image"
            className="rounded-full border-2 border-purple-400"
          />
        )
      )}
    </div>
  )
}
export default UserField
