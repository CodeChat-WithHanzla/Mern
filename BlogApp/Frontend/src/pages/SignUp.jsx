import { Alert, Button, FileInput, Label, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, OAuth } from '../components'

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    ProfilePicture: null,
  });

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { id, value, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: files ? files[0] : value.trim()
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError(null)
    if (!formData.username || !formData.email || !formData.password) {
      setLoading(false)
      return setError("Please fill out all the fields.")
    }
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });


    try {
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        body: payload,
      })
      const data = await res.json()
      if (data.success === false)
        return setError(data.message)
      if (res.ok)
        navigate('/sign-in')
    } catch (error) {
      setError(`Error :: ${error.message}`);
    }
    finally {
      setLoading(false)
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