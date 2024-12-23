import { useState } from 'react'
import { Link } from 'react-router-dom'

function CaptainLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserData({ email, password })
    setEmail('')
    setPassword('')
  }

  return (
    <div
      className='p-7 min-h-screen bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D")]'
    >
      <div className="">
        <img src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png" alt="Uber Logo" className='w-24 mb-10' />
        <form onSubmit={handleSubmit}>
          <h3 className='text-lg font-medium mb-2 text-white'>What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='name@example.com'
            className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
            spellCheck='false'
          />
          <h3 className='text-lg font-medium text-white'>Enter password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='*********'
            className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
          />
          <button className='bg-[#111] text-white font-semibold mb-7 rounded px-2 py-2 w-full text-lg' type='submit'>Login</button>
        </form>
      </div>
      <div className="mt-72">
        <div className="text-white font-bold text-center mb-3">
          <button className='text-gray-300'>Ready to become a captain? {' '}<Link to="/captain-signup" className='sm:hover:underline underline'>Sign up now</Link></button>
        </div>
        <Link to='/login'>
          <button className='bg-pink-800 text-white font-semibold rounded px-2 py-2 w-full text-lg'>
            Sign in as a User
          </button>
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
