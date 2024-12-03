// utils/data/sideBarLinks.ts
import {
  ClipboardList,
  House,
  Users,
  FileText,
  Calendar,
  PieChart,
  ListTodo,
  Rows3,
  BookOpen,
} from 'lucide-react'
import { BsPeopleFill } from 'react-icons/bs'
import { FaRegCalendarAlt } from 'react-icons/fa'
export const links = [
  { href: '/', label: 'Home', icon: House, adminOnly: false, email: '' },
  {
    href: '/createtask',
    label: 'Create Task',
    icon: ClipboardList,
    adminOnly: false,
    email: '',
  },
  {
    href: '/usertasks',
    label: 'User Tasks',
    icon: ListTodo,
    adminOnly: false,
    email: '',
  },
  {
    href: '/userattendance',
    label: 'User Attendance',
    icon: Calendar,
    adminOnly: false,
    email: '',
  },
  // Admin-only links
  {
    href: '/AllAttendance',
    label: 'Total Attendance',
    icon: PieChart,
    adminOnly: true,
    email: 'octtoppus1@gmail.com',
  },
  {
    href: '/All_Tasks',
    label: 'All Task Details',
    icon: Rows3,
    adminOnly: false,
    email: '',
  },
  {
    href: '/report',
    label: 'Report',
    icon: FileText,
    adminOnly: true,
    email: 'octtoppus1@gmail.com',
  },
  {
    href: '/users',
    label: 'All Users',
    icon: Users,
    adminOnly: true,
    email: 'octtoppus1@gmail.com',
  },
  {
    href: '/Guide',
    label: 'Report Guide',
    icon: BookOpen,
    adminOnly: false,
    email: '',
  },
  {
    href: '/Candidates ',
    label: 'Candidates  (under development)',
    icon: BsPeopleFill,
    adminOnly: true,
    email: 'octtoppus1@gmail.com',
  },
  {
    href: '/Meetings',
    label: 'Meetings  (under development)',
    icon: FaRegCalendarAlt,
    adminOnly: true,
    email: 'octtoppus1@gmail.com',
  },
]
