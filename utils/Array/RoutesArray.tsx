import { ChartPie, LayoutDashboard, Receipt } from 'lucide-react'
import { BiTask } from 'react-icons/bi'

export const Routes = [
  {
    Name: 'Dashboard',
    Path: '/dashboard',
    SVG: <LayoutDashboard />,
  },
  {
    Name: 'Reports',
    Path: '/reports',
    SVG: <ChartPie />,
  },
  // {
  //   Name: 'Invoices',
  //   Path: '/invoices',
  //   SVG: <Receipt />,
  // },
  {
    Name: 'Admin',
    Path: '/Admin',
    SVG: <Receipt />,
  },
  {
    Name: 'TaskBoard',
    Path: '/TaskBoard',
    SVG: <BiTask />,
  },
]
