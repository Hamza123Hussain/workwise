import { RootState } from '@/utils/Redux/Store/Store'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const SideBarLinks = () => {
  const User = useSelector((state: RootState) => state.user)
  return (
    <>
      <Link
        href="/"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Home
      </Link>
      {User.Email == 'octtoppus1@gmail.com' ? (
        <Link
          href="/createtask"
          className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
        >
          Create Task
        </Link>
      ) : (
        ''
      )}
      <Link
        href="/usertasks"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        User Tasks
      </Link>
      <Link
        href="/userattendance"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        User Attendance
      </Link>
      {User.Email == 'octtoppus1@gmail.com' ? (
        <Link
          href={'/AllAttendance'}
          className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
        >
          Total Attendance
        </Link>
      ) : (
        ''
      )}
      {User.Email == 'octtoppus1@gmail.com' ? (
        <Link
          href="/All_Tasks"
          className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
        >
          All Task Details
        </Link>
      ) : (
        ''
      )}{' '}
      {User.Email == 'octtoppus1@gmail.com' ? (
        <Link
          href="#"
          className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
        >
          Report
        </Link>
      ) : (
        ''
      )}{' '}
      {User.Email == 'octtoppus1@gmail.com' ? (
        <Link
          href="/users"
          className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
        >
          All Users
        </Link>
      ) : (
        ''
      )}
      <Link
        href="/Profile"
        className="text-white hover:text-[#FF5733]  hover:rounded-lg hover:px-2"
      >
        Profile
      </Link>
    </>
  )
}

export default SideBarLinks
