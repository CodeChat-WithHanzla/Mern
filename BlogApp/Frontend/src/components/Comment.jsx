import { useEffect, useState } from 'react'
import moment from 'moment'
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { Button, Textarea } from 'flowbite-react'
function Comment({ comment, onLike, onEdit, onDelete }) {
    const [user, setUser] = useState({})
    const [isLiked, setIsLiked] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(comment.content)
    const { currentUser } = useSelector(state => state.user)
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/${comment?.userId}`)
                const { data } = await res.json()
                if (res.ok)
                    setUser(data)

            } catch (error) {
                console.log(error.message);
            }
        }
        getUser()
        if (currentUser && comment.likes.includes(currentUser._id)) {
            setIsLiked(true);
        }
    }, [comment, currentUser._id])
    const handleLike = () => {
        setIsLiked((prev) => !prev);
        onLike(comment._id);
    };
    const handleEdit = async () => {
        try {
            setIsEditing(true)
            setEditedContent(comment.content)
        } catch (error) {
            console.log(error.message);

        }
    }
    const handleSave = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/comments/updateComment/${comment._id}`, { method: "PUT", headers: { "Content-type": "application/json" }, body: JSON.stringify({ content: editedContent }) })
            if (res.ok) {
                setIsEditing(false)
                onEdit(comment, editedContent)
            }
        } catch (error) {
            console.log(error.message);

        }
    }
    const handleDelete = async () => { }
    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className="flex-shrink-0 mr-3">
                <img className='w-10 h-10 rounded-full bg-gray-200' src={user.ProfilePicture} alt={user.username} />
            </div>
            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : `anonymous user`}</span>
                    <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
                </div>
                {isEditing ? (<>
                    <Textarea
                        className='mb-2'
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 text-xs">
                        <Button type='button' size='sm' gradientDuoTone='purpleToBlue' onClick={handleSave}>Save</Button>
                        <Button type='button' size='sm' gradientDuoTone='purpleToBlue' outline onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                </>) : (
                    <>
                        <p className='text-gray-500 pb-2'>{comment.content}</p>
                        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
                            <button
                                type='button'
                                className={`${isLiked ? 'text-blue-500' : 'text-gray-400'} hover:text-blue-500`}
                                onClick={handleLike}
                            >
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>{comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "Like" : "Likes")}</p>
                            {
                                currentUser && currentUser._id === comment.userId && (
                                    <>
                                        <button onClick={handleEdit} type='button' className='text-gray-400 hover:text-blue-500'>Edit</button>
                                        <button onClick={() => onDelete(comment._id)} type='button' className='text-gray-400 hover:text-red-500'>Delete</button>
                                    </>
                                )
                            }
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default Comment