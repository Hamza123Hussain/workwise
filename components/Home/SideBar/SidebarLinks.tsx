import { RootState } from '@/utils/Redux/Store/Store'
import {
  ClipboardList,
  House,
  Users,
  FileText,
  Calendar,
  PieChart,
  User2,
  ListTodo,
  Rows3,
} from 'lucide-react' // Import additional icons
import Link from 'next/link'
import { useSelector } from 'react-redux'

const SideBarLinks = () => {
  const User = useSelector((state: RootState) => state.user)

  return (
    <>
      <Link
        href="/"
        className="text-white gap-3 w-full flex items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
      >
        <House size={18} />
        <h5>Home</h5>
      </Link>
      <Link
        href="/createtask"
        className="text-white gap-3 flex w-full items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
      >
        <ClipboardList size={18} />
        <h5>Create Task</h5>
      </Link>
      <Link
        href="/usertasks"
        className="text-white gap-3 flex w-full items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
      >
        <ListTodo size={18} />
        <h5>User Tasks</h5>
      </Link>
      <Link
        href="/userattendance"
        className="text-white gap-3 flex w-full items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
      >
        <Calendar size={18} />
        <h5>User Attendance</h5>
      </Link>

      {User.Email === 'octtoppus1@gmail.com' && (
        <>
          <Link
            href="/AllAttendance"
            className="text-white gap-3 w-full flex items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
          >
            <PieChart size={18} />
            <h5>Total Attendance</h5>
          </Link>
          <Link
            href="/All_Tasks"
            className="text-white gap-3 w-full flex items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
          >
            <Rows3 size={18} />
            <h5>All Task Details</h5>
          </Link>
          <Link
            href="/report"
            className="text-white gap-3 w-full flex items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
          >
            <FileText size={18} />
            <h5>Report</h5>
          </Link>
          <Link
            href="/users"
            className="text-white gap-3 flex w-full items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
          >
            <Users size={18} />
            <h5>All Users</h5>
          </Link>
        </>
      )}
      <Link
        href="/Profile"
        className="text-white gap-3 flex w-full items-center hover:bg-white hover:text-[#5925da] hover:rounded-lg hover:px-2"
      >
        <User2 size={18} />
        <h5>Profile</h5>
      </Link>
    </>
  )
}

export default SideBarLinks
