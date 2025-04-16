import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Alert, Modal, Button, Table, Spinner } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaSpinner, FaCheck, FaTimes } from 'react-icons/fa'
function DashComments() {
    const { currentUser } = useSelector(state => state.user)
    const [comments, setComments] = useState([])
    const [showMore, setShowMore] = useState(true)
    const [showLess, setShowLess] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [commentIdToDelete, setCommentIdToDelete] = useState(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const fetchComments = async () => {
        try {
            const res = await fetch(`/api/v1/comments/get`)
            const { data } = await res.json()
            if (res.ok) {
                setComments(data.comments)
                if (data.comments.length < 9)
                    setShowMore(false)
            }
        } catch (error) {
            setError("Failed to load comments. Please try again.")
        }
    }
    useEffect(() => {
        if (currentUser.isAdmin)
            fetchComments()
    }, [currentUser._id])
    const handleShowMore = async () => {
        const startIndex = comments.length
        setIsLoading(true)
        try {
            const res = await fetch(`/api/v1/comments/get?startIndex=${startIndex}`)
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
    const handleDeleteComment = async () => {
        try {
            const res = await fetch(`/api/v1/comments/deleteComments/${commentIdToDelete}`, { method: 'DELETE' })
            if (res.ok) {
                setComments(prev => prev.filter(comment => comment._id !== commentIdToDelete))
                setShowModal(false)
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='table-auto overflow-x-scroll md:overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && comments.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md' >
                        <Table.Head>
                            <Table.HeadCell>Date Updated</Table.HeadCell>
                            <Table.HeadCell>Comment Content</Table.HeadCell>
                            <Table.HeadCell>Number of Likes</Table.HeadCell>
                            <Table.HeadCell>PostId</Table.HeadCell>
                            <Table.HeadCell>UserId</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        {comments.map((comment) =>
                        (<Table.Body className='divide-y' key={comment._id}>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>
                                    {new Date(comment?.updatedAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    {comment?.content}
                                </Table.Cell>
                                <Table.Cell>
                                    {comment?.likes.length}
                                </Table.Cell>
                                <Table.Cell>
                                    {comment?.postId}
                                </Table.Cell>
                                <Table.Cell>
                                    {comment?.userId}
                                </Table.Cell>
                                <Table.Cell>
                                    <span className='font-medium text-red-500 hover:underline cursor-pointer' onClick={() => { setShowModal(true); setCommentIdToDelete(comment._id) }}>Delete</span>
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
                                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this comment?</h3>
                                <div className="flex justify-center gap-4">
                                    <Button color='failure' onClick={handleDeleteComment}>Yes, I'm sure</Button>
                                    <Button color='gray' onClick={() => setShowModal(false)}>No,cancel</Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            ) : <div className='flex justify-center items-center min-h-screen'>
                There are currently no comments.
            </div>}</div>
    )
}

export default DashComments