import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIns from './pages/SignIns'
import ForgotPassword from './pages/ForgotPassword'
import useGetCurrentUser from './pages/hooks/useGetCurrentUser.jsx'
import { setUserData } from "./redux/userSlice"
import { useSelector } from 'react-redux'
import Home from './pages/Home'
import { serverUrl } from './config'

function App() {
  useGetCurrentUser()
  const { userData } = useSelector(state => state.user)//redux se user data le raha hu
  return (
    <div>
      <Routes>
        {/*<Route path="/" element={<SignIns />} />*/}
        <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path="/signin" element={!userData ? <SignIns /> : <Navigate to={"/"} />} />
        <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
        <Route path="/" element={userData ? <Home /> : <Navigate to={"/signin"} />} />
      </Routes>
    </div>
  )
}

export default App
