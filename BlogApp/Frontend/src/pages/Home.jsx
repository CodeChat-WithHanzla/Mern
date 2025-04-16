import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CallToAction, PostCard } from '../components'
function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/get-posts`)
      const { posts } = await res.json()
      setPosts(posts)
    }
    fetchPosts()
  }, [])

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>Explore insightful articles on web development, data structures, DevOps, and React Native—all from my personal tech journey.</p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7 ">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6 items-center">
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map(post => (<PostCard key={post._id} post={post} />))}
            </div>
            <Link to='/search' className='text-xl text-teal-500 hover:underline text-center'>View all posts</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home