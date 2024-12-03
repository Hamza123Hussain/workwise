import React from 'react'
import { FaLinkedin } from 'react-icons/fa'
import { FcBriefcase } from 'react-icons/fc'

const Links = ({
  LinkedInProfile,
  Portfolio,
}: {
  LinkedInProfile: string
  Portfolio: string
}) => {
  return (
    <div className="flex items-center justify-start gap-5 mt-4">
      {LinkedInProfile && (
        <a
          href={LinkedInProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group text-blue-500 hover:text-blue-600"
        >
          <FaLinkedin size={24} />
          <div className="absolute left-20 transform -translate-x-1/2 mt-2 hidden group-hover:flex bg-black text-white text-sm py-1 px-2 rounded shadow-lg">
            <h6 className=" text-[10px] text-nowrap">{LinkedInProfile}</h6>
          </div>
        </a>
      )}
      {Portfolio && (
        <a
          href={Portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group text-green-500 hover:text-green-600"
        >
          <FcBriefcase size={24} />
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:flex bg-black text-white text-sm py-1 px-2 rounded shadow-lg">
            <h6 className=" text-[10px] text-nowrap">{Portfolio}</h6>
          </div>
        </a>
      )}
    </div>
  )
}

export default Links
