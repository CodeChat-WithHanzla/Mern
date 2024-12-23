import React from 'react'
import { Link } from 'react-router-dom'
function Start() {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://res.cloudinary.com/dwlbprnr5/image/upload/v1734798883/frqvzinx22qgaik6sczd.jpg)] h-screen w-full pt-8 flex justify-between flex-col">
        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" className='w-24 ml-8' />
        <div className="bg-white py-4 px-4 pb-7 ">
          <h2 className='text-3xl font-bold '>Get Started with Uber</h2>
          <Link to='/login'><button className='w-full bg-black text-white py-3 rounded mt-5'>Continue</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Start