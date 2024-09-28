import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/Register'
import ResetPassword from './components/Auth/ResetPassword'
import { useSelector } from 'react-redux'

import Sidebar from './components/SideBar'
import { RootState } from './utils/Redux/Store/Store'
import CreateTaskForm from './components/Tasks/CreateTask'
import AllAttendance from './components/Attendance/AllAttendance'
import HomePage from './components/Homepage'

function App() {
  const UserData = useSelector((state: RootState) => state.user)
  return (
    <>
      {!UserData.Name ? (
        <div className="    flex  items-center justify-center h-screen ">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/Login" element={<SignIn />} />
            <Route path="/Register" element={<SignUp />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            {/* <Route path="/AllAttendance" element={<AllAttendance />} /> */}
          </Routes>
        </div>
      ) : (
        <div className=" min-h-screen flex gap-4">
          <Sidebar />
          <Routes>
            <Route path="/" element={<AllAttendance />} />
            <Route path="/CreateTask" element={<CreateTaskForm />} />
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
