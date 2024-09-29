import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, OAuth } from '../components'
import { signInStart, signInSuccess, signInFailure } from '../slices/userSlice.js'
import { useDispatch, useSelector } from 'react-redux'
function SignIn() {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all the fields."))
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/v1/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success === false)
        dispatch(signInFailure(data.message))
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }

  }
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 gap-5 max-w-3xl mx-auto flex-col md:flex-row">
        {/* left Side div */}
        <div className="flex-1">
          <Logo />
          <p className='text-sm mt-5 '>Join our community and start sharing your thoughts with the world.
            Your voice matters – let it be heard.</p>
        </div>
        {/* Right Side div */}
        <div className="flex-1">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email' />
              <TextInput type='email' placeholder='company@gmail.com' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='********' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>) : "Sign In"}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
          {
            error && (
              <Alert className='mt-5' color='failure'>
                {error}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn