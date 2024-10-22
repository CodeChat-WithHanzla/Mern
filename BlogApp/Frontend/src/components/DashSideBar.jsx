import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import { HiUser, HiArrowSmRight } from 'react-icons/hi'
import {
    signOutStart,
    signOutSuccess,
    signOutFailure,
} from '../slices/userSlice'
import { useDispatch } from 'react-redux'
function DashSideBar() {
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
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label='User' labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSideBar