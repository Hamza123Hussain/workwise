'use client'

import React from 'react'

import { Routes } from '@/utils/Array/RoutesArray'
import ShowUser from '@/components/Profile/ShowUser'
import Dashboard from '@/components/DashBoard/Dashboard'
import MainFinanceComponent from '@/components/Finance/MainComponent'
import PerformanceReportPage from '@/components/ReportSection/Main'

const HomePage = () => {
  const [RouteSelected, SetRouteSelected] = React.useState('Dashboard')
  return (
    <div className=" bg-white mt-5 flex flex-col">
      <div className=" flex justify-between items-center px-4">
        <div className=" flex items-center gap-5">
          {Routes.map((route) => (
            <div
              onClick={() => SetRouteSelected(route.Name)}
              key={route.Name}
              className={`${
                RouteSelected === route.Name
                  ? 'text-[#6d3df1]'
                  : 'text-[#2a2a2a]'
              } flex items-center gap-2 cursor-pointer`}
            >
              {route.SVG}
              <h1 className=" text-lg">{route.Name}</h1>
            </div>
          ))}
        </div>
        <ShowUser />
      </div>
      <hr className=" px-4 text-[#CECECE]" />
      {RouteSelected === 'Dashboard' ? (
        <Dashboard />
      ) : RouteSelected === 'Reports' ? (
        <PerformanceReportPage />
      ) : RouteSelected === 'Invoices' ? (
        <MainFinanceComponent />
      ) : (
        ''
      )}
    </div>
  )
}
export default HomePage
