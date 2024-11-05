import { useEffect, useState, } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react'
import { PostCard, CommentsSection, CallToAction } from "../components";
function Posts() {
    const { postSlug } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)
    const [recentPosts, setRecentPosts] = useState(null)
    const fetchPost = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(`/api/v1/posts/get-posts?slug=${postSlug}`)
            const { posts } = await res.json()
            if (!res.ok) {
                return setError(true)
            }
            if (res.ok) {
                setPost(posts?.[0])
            }
            setIsLoading(false)
            setError(null)
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
            setError(null)
        }
    }
    useEffect(() => {
        fetchPost()
    }, [postSlug])
    useEffect(() => {
        try {
            const fetchRequestPosts = async () => {
                const res = await fetch(`/api/v1/posts/get-posts?limit=3`)
                const { posts } = await res.json()
                if (res.ok) {
                    setRecentPosts(posts)
                }
            }
            fetchRequestPosts()
        } catch (error) {
            console.log(error.message);
        }
    }, [])
    if (isLoading) return <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
    </div>;
    return (
        <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
            <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post?.title}</h1>
            <Link to={`/search?category=${post && post?.category}`} className='self-center mt-5'>
                <Button color='gray' pill size='xs'>{post && post?.category}</Button>
            </Link>
            <img src={post?.coverImage} alt={post && post?.title} className='mt-10 p-3 max-h-[600px] w-full object-cover' />
            <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs ">
                <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
            </div>
            <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{ __html: post && post?.content }}></div>
            <div className="max-w-4xl mx-auto w-full">
                <CallToAction />
            </div>
            <CommentsSection postId={post?._id} />
            <div className="flex flex-col justify-center items-center mb-5">
                <h1 className='text-xl mt-5'>Recent Articles</h1>
                <div className="flex flex-wrap gap-5 mt-5 justify-center">
                    {
                        recentPosts && recentPosts.map(post => (
                            <PostCard key={post._id} post={post} />
                        ))
                    }
                </div>
            </div>
        </main>
    )
}

export default Posts