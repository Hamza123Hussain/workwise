import React from 'react'
import Sidebar from './components/SideBar'
import HomePage from './components/Homepage'

function App() {
  return (
    <div className=" flex min-h-screen">
      <Sidebar />

      <HomePage />
    </div>
  )
}

export default App
