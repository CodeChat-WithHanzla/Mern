import { Alert, Button, FileInput, Label, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, OAuth } from '../components'
import { useDispatch, useSelector } from 'react-redux';
import {
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from '../slices/userSlice'
function SignUp() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    ProfilePicture: null,
  });
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.user)
  const handleChange = (e) => {
    const { id, value, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: files ? files[0] : value.trim()
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return dispatch(signUpFailure("Please fill out all the fields."))
    }
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });


    try {
      dispatch(signUpStart())
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        body: payload,
      })
      const { data, message } = await res.json()
      if (!res.ok)
        return dispatch(signUpFailure(message))
      dispatch(signUpSuccess(data))
      navigate('/sign-in')
    } catch (error) {
      dispatch(signUpFailure(error.message))
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
              <Label value='Your Username' />
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your Email' />
              <TextInput type='email' placeholder='company@gmail.com' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
            </div>
            <div>
              <Label value='Upload file' />
              <FileInput accept="image/*" helperText="JPEG, PNG, or JPG (Max: 2MB)" id='ProfilePicture' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>) : "Sign Up"}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
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

export default SignUp