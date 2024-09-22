import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Sidebar from './components/SideBar'
import HomePage from './components/Homepage'
import Login from './components/Auth/Login'
import Signup from './components/Auth/SignUp'
import ResetPassword from './components/Auth/ResetPass'

function App() {
  const location = useLocation()

  // Define the auth routes where you don't want the sidebar
  const authRoutes = ['/login', '/register', '/reset']

  const isAuthRoute = authRoutes.includes(location.pathname)

  return (
    <div className="flex min-h-screen  ">
      {/* Only show the sidebar if it's not an auth route */}
      {!isAuthRoute && <Sidebar />}

      <Routes>
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
