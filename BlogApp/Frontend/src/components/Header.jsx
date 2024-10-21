import React from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { Logo } from './index'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../slices/themeSlice'
function Header() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector(state => state.user)
  // console.log(currentUser);

  const dispatch = useDispatch()
  const mode = useSelector(state => state.theme.mode)
  return (
    <Navbar className='border-b-2'>
      <Logo className='self-center whitespace-nowrap text-sm' />
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
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
            <Dropdown.Item>Sign Out</Dropdown.Item>
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