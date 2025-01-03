import React from 'react'
import { About, Dashboard, Home, Projects, SignIn, SignUp, CreatePosts, UpdatePosts, Posts, Search } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ScrollToTop, Header, Footer, PrivateRoute, OnlyAdminPrivateRoute } from './components';
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-posts' element={<CreatePosts />} />
          <Route path='/update-posts/:postId' element={<UpdatePosts />} />
        </Route>
        <Route path='/projects' element={<Projects />} />
        <Route path='/posts/:postSlug' element={<Posts />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App