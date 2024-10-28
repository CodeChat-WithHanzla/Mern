import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Button, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
function DashPosts() {
    const { currentUser } = useSelector(state => state.user)
    const [userPost, setUserPost] = useState([])
    const [showMore, setShowMore] = useState(true)
    console.log(userPost);

    const fetchPosts = async () => {
        try {
            const res = await fetch(`/api/v1/posts/get-posts?userId=${currentUser._id}`)
            const data = await res.json()
            if (res.ok) {
                setUserPost(data.posts)
                if (data.posts.length < 9)
                    setShowMore(false)
            }
            console.log(data);
        } catch (error) {
            console.log(error.message);

        }
    }
    useEffect(() => {
        if (currentUser.isAdmin)
            fetchPosts()
    }, [currentUser._id])
    const handleShowMore = async () => {
        const startIndex = userPost.length
        try {
            const res = await fetch(`/api/v1/posts/get-posts?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json()
            console.log(data);

            if (res.ok) {
                setUserPost((prev) => [...prev, ...data.posts])
                if (data.posts.length < 9)
                    setShowMore(false)
            }
        } catch (error) {
            console.log(error.message);

        }
    }
    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>{currentUser.isAdmin && userPost.length > 0 ? (
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
                                <Link to={`posts/${post.slug}`}>
                                    <img src={post.coverImage} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <Link className='font-medium text-gray-900 dark:text-white' to={`posts/${post.slug}`}>{post.title}</Link>
                            </Table.Cell>
                            <Table.Cell>
                                {post.category}
                            </Table.Cell>
                            <Table.Cell>
                                <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
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
                {
                    showMore && (
                        <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                            Show More
                        </button>
                    )
                }
            </>
        ) : <p>You have no posts yet</p>}</div>
    )
}

export default DashPosts