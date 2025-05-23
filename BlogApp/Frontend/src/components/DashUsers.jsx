import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Alert, Modal, Button, Table, Spinner } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaSpinner, FaCheck, FaTimes } from 'react-icons/fa'
function DashUsers() {
    const { currentUser } = useSelector(state => state.user)
    const [users, setUsers] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [showLess, setShowLess] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [userIdToDelete, setUserIdToDelete] = useState(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const fetchUsers = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/getUsers`)
            const { data } = await res.json()
            if (res.ok) {
                setUsers(data.users)
                if (data.users.length < 9)
                    setShowMore(false)
            }
        } catch (error) {
            setError("Failed to load users. Please try again.")
        }
    }
    useEffect(() => {
        if (currentUser.isAdmin)
            fetchUsers()
    }, [currentUser._id])
    const handleShowMore = async () => {
        const startIndex = users.length
        setIsLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/getUsers?startIndex=${startIndex}`)
            const { data } = await res.json()
            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users])
                if (data.users.length < 9)
                    setShowMore(false)
                setShowLess(true)
            }
        } catch (error) {
            setError("Failed to load more users. Please try again.")
        }
        finally {
            setIsLoading(false)
        }
    }
    const handleShowLess = async () => {
        setIsLoading(true)
        setTimeout(() => {
            try {
                const min_array = users.slice(0, 9)
                setUsers(min_array)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
                setShowLess(false)
                setShowMore(true)
            }
        }, 500)
    }
    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/delete/${userIdToDelete}`, { method: 'DELETE' })
            if (res.ok) {
                setUsers(prev => prev.filter(user => user._id !== userIdToDelete))
                setShowModal(false)
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='table-auto overflow-x-scroll md:overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md' >
                        <Table.Head>
                            <Table.HeadCell>Date Created</Table.HeadCell>
                            <Table.HeadCell>Profile Picture</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        {users.map((user) =>
                        (<Table.Body className='divide-y' key={user._id}>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>
                                    {new Date(user?.createdAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    <img src={user?.ProfilePicture} alt={user?.username} className='w-10 h-10 object-cover bg-gray-500 rounded-full' />
                                </Table.Cell>
                                <Table.Cell>
                                    {user?.username}
                                </Table.Cell>
                                <Table.Cell>
                                    {user?.email}
                                </Table.Cell>
                                <Table.Cell>
                                    {user?.isAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}
                                </Table.Cell>
                                <Table.Cell>
                                    <span className='font-medium text-red-500 hover:underline cursor-pointer' onClick={() => { setShowModal(true); setUserIdToDelete(user._id) }}>Delete</span>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>)
                        )}
                    </Table>
                    {showMore && (
                        <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7 flex justify-center items-center'>
                            {isLoading ? <FaSpinner className="animate-spin mr-2 w-20 h-20" /> : 'Show More'}
                        </button>
                    )}
                    {showLess && (<button onClick={handleShowLess} className='w-full text-teal-500 self-center text-sm py-7 flex justify-center items-center'>
                        {isLoading ? <FaSpinner className="animate-spin mr-2 w-20 h-20" /> : 'Show Less'}
                    </button>)}
                    {
                        error && <Alert className='mt-5 animate-shake' color='failure'>{error}</Alert>
                    }
                    <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
                                <div className="flex justify-center gap-4">
                                    <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
                                    <Button color='gray' onClick={() => setShowModal(false)}>No,cancel</Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            ) : <div className='flex justify-center items-center min-h-screen'>
                <Spinner size='xl' />
            </div>}</div>
    )
}

export default DashUsers