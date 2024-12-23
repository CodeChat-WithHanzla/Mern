import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Notification from '../components/Notification';

function CaptainSignup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const { setCaptainData } = useContext(CaptainDataContext)
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, {
        fullName: {
          firstName,
          lastName
        },
        email,
        password,
        vehicle: {
          color: vehicleColor,
          plate: vehiclePlate,
          capacity: vehicleCapacity,
          vehicleType
        }
      })
      if (res.status === 201) {
        setCaptainData(res.data.captain)
        localStorage.setItem('token', res.data.token)
        navigate('/captain-home')
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg || 'Something went wrong';
        setNotification({
          message: errorMessage,
          type: 'error',
        });
      } else {
        setNotification({
          message: 'Network error. Please try again.',
          type: 'error',
        });
      }
    }
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  return (
    <div
      className='p-7 min-h-screen bg-cover  bg-[url("https://res.cloudinary.com/dwlbprnr5/image/upload/v1734954670/bf031336-b0ba-4205-996d-d4739965953e_3_rwhwuc.webp")]'
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              required
              placeholder='Last Name'
              className='bg-[#eeeeee] rounded px-2 py-2 border w-1/2 text-lg placeholder:text-base'
              spellCheck='false'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          <h3 className='text-lg font-medium mb-2'>Vehicle Color</h3>
          <input
            type="text"
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            required
            placeholder='Vehicle Color'
            className='bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base text-gray-900'
            spellCheck='false'
          />
          <h3 className='text-lg font-medium mb-2'>Vehicle Plate</h3>
          <input
            type="text"
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            required
            placeholder='Vehicle Plate'
            className='bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base text-gray-900'
            spellCheck='false'
          />
          <h3 className='text-lg font-medium mb-2'>Vehicle Capacity</h3>
          <input
            type="number"
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            required
            placeholder='Vehicle Capacity'
            className='bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base text-gray-900'
            spellCheck='false'
          />
          <h3 className='text-lg font-medium mb-2'>Vehicle Type</h3>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
            className='bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base text-gray-900'
          >
            <option value="" disabled>Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
          </select>
          <button className='bg-[#111] text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg' type='submit'>Create Captain Account</button>
        </form>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
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