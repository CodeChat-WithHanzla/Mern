import { useState, useEffect } from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Logo } from './index'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../slices/themeSlice'
import {
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from '../slices/userSlice'
function Header() {
  const { pathname, search } = useLocation();
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const mode = useSelector(state => state.theme.mode)
  const [searchItem, setSearchItem] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const urlParams = new URLSearchParams(search)
    const searchTermFromUrl = urlParams.get('searchItem')
    if (searchTermFromUrl)
      setSearchItem(searchTermFromUrl)
  }, [search])

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart())
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/signout`, {
        method: 'POST'
      })
      const { message } = await res.json()
      if (!res.ok)
        return dispatch(signOutFailure(message))
      dispatch(signOutSuccess())
    } catch (error) {
      dispatch(signOutFailure(error.message))
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(search)
    urlParams.set('searchItem', searchItem)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  return (
    <Navbar className='border-b-2'>
      <Logo className='self-center whitespace-nowrap text-sm' />
      <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill onClick={() => navigate('/search')}>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {mode === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (<Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser?.ProfilePicture} rounded />}>
          <Dropdown.Header>
            <span className='block text-sm'>@{currentUser?.username}</span>
            <span className='block text-sm font-medium truncate'>{currentUser?.email}</span>
          </Dropdown.Header>
          <Link to='/dashboard?tab=profile'>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Link>
        </Dropdown>) : (<Link to='/sign-in'>
          <Button gradientDuoTone='purpleToBlue' outline>
            SignIn
          </Button>
        </Link>)
        }
        <Navbar.Toggle />
      </div >
      <Navbar.Collapse>
        <Navbar.Link active={pathname === '/'} as={'div'}>
          <Link to='/'>
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={pathname === '/about'} as={'div'}>
          <Link to='/about' >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={pathname === '/projects'} as={'div'}>
          <Link to='/projects' >
            Projects
          </Link>
        </Navbar.Link>

      </Navbar.Collapse>

    </Navbar >
  )
}

export default Header