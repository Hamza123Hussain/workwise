import Link from 'next/link'

const SideBarLinks = () => {
  return (
    <div className="flex flex-col p-4 spLinkce-y-5 w-full">
      <Link
        href="/"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Home
      </Link>
      <Link
        href="/CreLinkteTLinksk"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Create Task
      </Link>
      <Link
        href="#"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        User Tasks
      </Link>
      <Link
        href="#"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        User Attendance
      </Link>
      <Link
        href={'/AllAttendance'}
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Total Attendance
      </Link>
      <Link
        href="#"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Report
      </Link>
      <Link
        href="#"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Profile
      </Link>
    </div>
  )
}

export default SideBarLinks
