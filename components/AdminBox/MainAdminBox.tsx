'use client'

import React, { useState } from 'react'
import KPIComponent from './KPIComponent'
import UserAttendance from './MainAttendance'
import SignUp from './RegisterAUser'
import RolesPage from '../RoleTask/Roles'
import TasksFilter from './MaintaskComponent'

const MainAdminBox = () => {
  const [activeSection, setActiveSection] = useState('kpi')

  const navButtonClass = (section: string) =>
    `
    relative px-6 py-3 text-sm font-semibold rounded-xl
    transition-all duration-200
    ${
      activeSection === section
        ? 'text-white bg-[#4F46E5] shadow-md shadow-purple-300'
        : 'text-gray-600 hover:bg-gray-200'
    }
  `

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* 🌟 Modern Top Navbar */}
      <nav className="w-full bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="mx-auto flex gap-3 px-6 py-4 overflow-x-auto no-scrollbar">
          <button
            className={navButtonClass('kpi')}
            onClick={() => setActiveSection('kpi')}
          >
            KPI Dashboard
          </button>
          <button
            className={navButtonClass('tasks')}
            onClick={() => setActiveSection('tasks')}
          >
            Tasks
          </button>
          <button
            className={navButtonClass('attendance')}
            onClick={() => setActiveSection('attendance')}
          >
            Attendance
          </button>
          <button
            className={navButtonClass('register')}
            onClick={() => setActiveSection('register')}
          >
            Register User
          </button>
          <button
            className={navButtonClass('RoleTasks')}
            onClick={() => setActiveSection('RoleTasks')}
          >
            Role Tasks
          </button>
        </div>
      </nav>

      {/* 🔥 Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeSection === 'kpi' && <KPIComponent />}
        {activeSection === 'tasks' && <TasksFilter />}
        {activeSection === 'attendance' && <UserAttendance />}
        {activeSection === 'register' && <SignUp />}
        {activeSection === 'RoleTasks' && <RolesPage />}
      </main>
    </div>
  )
}

export default MainAdminBox
