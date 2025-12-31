'use client'

import React, { useState } from 'react'
import KPIComponent from './KPIComponent'
import UserAttendance from './MainAttendance'
import Tasks from './MaintaskComponent'
import AllUserData from './UsersComponent'
import SignUp from './RegisterAUser'
import RolesPage from '../RoleTask/Roles'
import TasksFilter from './MaintaskComponent'

const MainAdminBox = () => {
  const [activeSection, setActiveSection] = useState('kpi')

  const navButtonClass = (section: string) =>
    `px-5 py-3 rounded-md transition-all duration-200 font-medium
     ${
       activeSection === section
         ? 'bg-purple-600 text-white shadow'
         : 'hover:bg-gray-200 text-gray-700'
     }`

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* 🔥 Top Navbar */}
      <nav className="w-full bg-white border-b shadow-sm">
        <div className=" mx-auto flex gap-4 px-6 py-4 overflow-x-auto no-scrollbar">
          <button
            className={navButtonClass('kpi')}
            onClick={() => setActiveSection('kpi')}
          >
            KPI
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
