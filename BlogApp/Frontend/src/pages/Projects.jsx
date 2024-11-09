import React from 'react'
import { CallToAction } from '../components'

function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex flex-col justify-center items-center gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Projects</h1>
      <p className='text-md text-gray-500'>Create exciting and interactive projects as you dive into the worlds of MERN, React Native, and AI, making learning both engaging and impactful</p>
      <CallToAction />
    </div>
  )
}

export default Projects