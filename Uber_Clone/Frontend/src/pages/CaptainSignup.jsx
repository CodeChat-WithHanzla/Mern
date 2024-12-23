import { useState } from 'react'
import { Link } from 'react-router-dom'


function CaptainSignup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    setCaptainData({ email, password })
    setEmail('')
    setPassword('')
  }
  return (
    <div
      className='p-7 min-h-screen bg-cover bg-center bg-[url("https://drz0f01yeq1cx.cloudfront.net/1734810843355-94139344375421121167851268302467811664.png")]'
    >
      <div className="">
        <img src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png" alt="Uber Logo" className='w-24 mb-10' />
        <form onSubmit={handleSubmit} className='text-white'>
          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className="flex gap-3 mb-5 text-gray-900">
            <input
              type="text"
              required
              placeholder='First Name'
              className='bg-[#eeeeee] rounded px-2 py-2 border w-1/2 text-lg placeholder:text-base'
              spellCheck='false'
            />
            <input
              type="text"
              required
              placeholder='Last Name'
              className='bg-[#eeeeee] rounded px-2 py-2 border w-1/2 text-lg placeholder:text-base'
              spellCheck='false'
            />
          </div>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='name@example.com'
            className='bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base text-gray-900'
            spellCheck='false'
          />
          <h3 className='text-lg font-medium '>Enter password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='*********'
            className='bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base text-gray-900'
          />
          <button className='bg-[#111] text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg' type='submit'>Sign Up</button>
        </form>
      </div>
      <div className="mt-60">
        <div className="text-white font-bold text-center mb-3">
          <button>Already have an account? {' '}<Link to="/captain-login" className='sm:hover:underline underline'>Login here</Link></button>
        </div>
        <Link to='/captain-login'>
          <button className='bg-pink-800 text-white font-semibold rounded px-2 py-2 w-full text-lg'>
            Sign in as a Captain
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CaptainSignup