import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Alert, Modal, Button, Table, Spinner } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa'
function DashPosts() {
    const { currentUser } = useSelector(state => state.user)
    const [userPost, setUserPost] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [showLess, setShowLess] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [postIdToDelete, setPostIdToDelete] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const fetchPosts = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/get-posts?userId=${currentUser._id}`)
            const data = await res.json()
            if (res.ok) {
                setUserPost(data.posts)
                if (data.posts.length < 9)
                    setShowMore(false)
            }
        } catch (error) {
            setError("Failed to load posts. Please try again.")
        }
    }
    useEffect(() => {
        if (currentUser.isAdmin)
            fetchPosts()
    }, [currentUser._id])
    const handleShowMore = async () => {
        const startIndex = userPost.length
        setIsLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/get-posts?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json()
            if (res.ok) {
                setUserPost((prev) => [...prev, ...data.posts])
                if (data.posts.length < 9)
                    setShowMore(false)
                setShowLess(true)
            }
        } catch (error) {
            setError("Failed to load more posts. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }
    const handleDeletePost = async () => {
        setShowModal(false)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/delete-posts/${postIdToDelete}/${currentUser._id}`, { method: "DELETE" })
            const data = await res.json()
            if (!res.ok) {
                console.log(data.message);
            }
            else {
                setUserPost((prev) => prev.filter(post => post._id !== postIdToDelete))
            }
        } catch (error) {
            console.log(error.message);

        }
    }
    const handleShowLess = async () => {
        setIsLoading(true)
        setTimeout(() => {
            try {
                const min_array = userPost.slice(0, 9)
                setUserPost(min_array)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
                setShowLess(false)
                setShowMore(true)
            }
        }, 500)
    }
    return (
        <div className='table-auto overflow-x-scroll md:overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && userPost.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md' >
                        <Table.Head>
                            <Table.HeadCell>Date Updated</Table.HeadCell>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Post title</Table.HeadCell>
                            <Table.HeadCell>Cateory</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userPost.map((post) =>
                        (<Table.Body className='divide-y' key={post._id}>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>
                                    {new Date(post?.updatedAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={`/posts/${post.slug}`}>
                                        <img src={post.coverImage} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link className='font-medium text-gray-900 dark:text-white' to={`/posts/${post.slug}`}>{post.title}</Link>
                                </Table.Cell>
                                <Table.Cell>
                                    {post.category}
                                </Table.Cell>
                                <Table.Cell>
                                    <span className='font-medium text-red-500 hover:underline cursor-pointer' onClick={() => { setShowModal(true); setPostIdToDelete(post._id) }}>Delete</span>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={`/update-posts/${post._id}`} className='text-teal-500 hover:underline'>
                                        <span>Edit</span>
                                    </Link>
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
                                    <Button color='failure' onClick={handleDeletePost}>Yes, I'm sure</Button>
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

export default DashPosts