import React from 'react'

function About() {
  return ( 
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className='text-3xl font-semibold text-center my-7'>About Hanzla's Blog</h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>Welcome to my corner of the web! I'm thrilled to have you here, exploring my journey and the projects I've poured my passion into. This space is where I share insights, challenges, and triumphs from my path in tech.</p>
            <p>
              I'm a driven developer with a passion for the MERN stack, React Native, and the transformative world of artificial intelligence. I'm dedicated to mastering full-stack web development while exploring how AI can revolutionize our digital experiences. Through continuous learning and impactful projects, I aim to shape the future of technology and make a meaningful difference in the industry.
            </p>
            <p>I'd love to hear from you! Your thoughts, questions, and feedback are incredibly valuable to me. Whether you have insights to share, questions about my posts, or simply want to start a conversation, feel free to leave a comment. Let’s learn and grow together in this ever-evolving tech world!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About