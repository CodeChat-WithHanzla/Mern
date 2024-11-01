import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import {
    signOutStart,
    signOutSuccess,
    signOutFailure,
} from '../slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'
function DashSideBar() {
    const { currentUser } = useSelector(state => state.user)
    const label = currentUser.isAdmin ? "Admin" : "User";
    const location = useLocation()
    const [tab, setTab] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl)
            setTab(tabFromUrl)
    }, [location.search])
    const handleSignOut = async () => {
        try {
            dispatch(signOutStart())
            const res = await fetch('/api/v1/auth/signout', {
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
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={label} labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && <Link to='/dashboard?tab=posts'>
                        <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} label={label} labelColor='dark' as='div'>
                            Posts
                        </Sidebar.Item>
                    </Link>}
                    {currentUser.isAdmin && <Link to='/dashboard?tab=users'>
                        <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} label={label} labelColor='dark' as='div'>
                            Users
                        </Sidebar.Item>
                    </Link>}
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSideBar