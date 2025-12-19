import React from 'react'
import { Routes, Route } from 'react-router-dom'  
import SignUp from './pages/SignUp'
import SignIns from './pages/SignIns'
import ForgotPassword from './pages/ForgotPassword'
export const serverUrl = "http://localhost:8000"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIns/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIns />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  )
}

export default App

