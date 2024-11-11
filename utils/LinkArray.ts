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
  { href: '/', label: 'Home', icon: House, adminOnly: false },
  {
    href: '/createtask',
    label: 'Create Task',
    icon: ClipboardList,
    adminOnly: false,
  },
  {
    href: '/usertasks',
    label: 'User Tasks',
    icon: ListTodo,
    adminOnly: false,
  },
  {
    href: '/userattendance',
    label: 'User Attendance',
    icon: Calendar,
    adminOnly: false,
  },
  // Admin-only links
  {
    href: '/AllAttendance',
    label: 'Total Attendance',
    icon: PieChart,
    adminOnly: true,
  },
  {
    href: '/All_Tasks',
    label: 'All Task Details',
    icon: Rows3,
    adminOnly: true,
  },
  {
    href: '/report',
    label: 'Report',
    icon: FileText,
    adminOnly: true,
  },
  {
    href: '/users',
    label: 'All Users',
    icon: Users,
    adminOnly: true,
  },
  {
    href: '/Guide',
    label: 'Report Guide',
    icon: BookOpen,
    adminOnly: false,
  },
]
