import React from 'react'

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>About Hanzla's Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>I'm a computer science student and an enthusiastic explorer of the ever-evolving world of technology. Welcome to my corner of the web—I'm glad you're here! This space captures my journey, experiences, and the projects I’ve passionately built along the way.</p>
            <p>With a strong interest in the MERN stack, React Native, and the revolutionary potential of artificial intelligence, I'm committed to becoming a skilled full-stack developer. I thrive on continuous learning and enjoy diving deep into how emerging technologies like AI are reshaping our digital world.</p>
            <p>Through this platform, I share the lessons, challenges, and breakthroughs I encounter in tech. I believe in growing through collaboration, and your thoughts and questions mean a lot. Whether you're curious about a post or just want to connect—feel free to drop a comment. Let’s grow, build, and innovate together!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About