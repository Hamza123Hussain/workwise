import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/Register'
import ResetPassword from './components/Auth/ResetPassword'

function App() {
  return (
    <div className="    flex  items-center justify-center h-screen ">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/Login" element={<SignIn />} />
        <Route path="/Register" element={<SignUp />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default App
