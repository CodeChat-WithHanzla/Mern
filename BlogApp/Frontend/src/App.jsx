import React from 'react'
import { About, Dashboard, Home, Projects, SignIn, SignUp } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header, Footer } from './components';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App