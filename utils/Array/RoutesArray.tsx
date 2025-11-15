import { ChartPie, LayoutDashboard, Receipt } from 'lucide-react'

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
  {
    Name: 'Invoices',
    Path: '/invoices',
    SVG: <Receipt />,
  },
]
