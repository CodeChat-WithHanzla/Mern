import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DashProfile, DashSideBar, DashPosts, DashUsers, DashComments } from '../components/index'
function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl)
      setTab(tabFromUrl)
  }, [location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSideBar />
      </div>
      {/* Profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* Posts... */}
      {tab === 'posts' && <DashPosts />}
      {/* Users... */}
      {tab === 'users' && <DashUsers />}
      {/* Comments... */}
      {tab === 'comments' && <DashComments />}
    </div>
  )
}

export default Dashboard