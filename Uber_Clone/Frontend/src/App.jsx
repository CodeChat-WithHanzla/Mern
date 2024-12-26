import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Start, UserLogin, UserSignup, CaptainLogin, CaptainSignup, Home, UserProtected, CaptainProtected, CaptainHome, Riding, CaptainRiding } from './pages'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<UserProtected><Home /></UserProtected>} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-home" element={<CaptainProtected><CaptainHome /></CaptainProtected>} />
      </Routes>
    </div>
  )
}

export default App