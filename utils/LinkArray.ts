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
    adminOnly: true,
    email: 'octtoppus1@gmail.com',
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
]
