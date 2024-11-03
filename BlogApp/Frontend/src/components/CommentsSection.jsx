import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import { Comment } from './index';
function CommentsSection({ postId }) {
    const { currentUser } = useSelector(state => state.user)
    const [comment, setComment] = useState("")
    const [error, setError] = useState(null)
    const [comments, setComments] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (comment.length > 200)
            return
        try {
            const res = await fetch(`/api/v1/comments/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: comment, postId, userId: currentUser?._id })
            })
            const data = await res.json()
            if (res.ok) {
                setComment('')
                setError(null)
                setComments([data, ...comments])
            }
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/v1/comments/get/${postId}`)
                if (res.ok) {
                    const { data } = await res.json()
                    setComments(data)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getComments()
    }, [postId])
    return (
        <div className='max-w-2xl mx-auto w-full p-3'>{currentUser ? (
            <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                <p>Signed in as: </p>
                <img src={currentUser.ProfilePicture} alt="" className='h-5 w-5 object-cover rounded-full' />
                <Link to='/dashboard?tab=profile' className='text-xs text-cyan-600 hover:underline'>
                    @ {currentUser.username}
                </Link>
            </div>
        ) : (
            <div className="text-sm text-teal-500 my-5 flex gap-1">
                You must be signed in to comment.
                <Link className='text-blue-500 hover:underline' to='/sign-in'>Sign In</Link>
            </div>
        )}
            {
                currentUser && (<form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                    <Textarea onChange={(e) => setComment(e.target.value)} value={comment} placeholder='Add a comment...' rows='3' maxLength='200' />
                    <div className="flex justify-between items-center mt-5">
                        <p className='text-gray-500 text-xs'>{200 - comment.length} Characters remaining</p>
                        <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                            Submit
                        </Button>
                    </div>
                    {error && <Alert color='failure' className='mt-5'>{error}</Alert>}
                </form>)
            }
            {comments.length === 0 ? (<p className='text-sm my-5'>No comments yet!</p>) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Comments</p>
                        <div className="border border-gray-400 py-1 px-2 rounded-sm">
                            <p>{comments.length}</p>
                        </div>
                    </div>
                    <div className="">
                        {comments.map(comment => (<Comment key={comment._id} comment={comment} />))}
                    </div>
                </>
            )}
        </div>
    )
}

export default CommentsSection