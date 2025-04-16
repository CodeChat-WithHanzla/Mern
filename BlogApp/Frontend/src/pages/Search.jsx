import { Button, Select, TextInput, Spinner } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PostCard } from '../components'
function Search() {
    const [sideBarData, setSideBarData] = useState({
        searchItem: '',
        sort: 'desc',
        category: 'uncategorized'
    })
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const { search } = useLocation()
    useEffect(() => {
        const urlParams = new URLSearchParams(search)
        const searchTermUrl = urlParams.get('searchItem')
        const sortFromUrl = urlParams.get('sort')
        const categoryFromUrl = urlParams.get('category')
        if (searchTermUrl || sortFromUrl || categoryFromUrl) {
            setSideBarData({ ...sideBarData, searchItem: searchTermUrl, sort: sortFromUrl, category: categoryFromUrl })
        }
        const fetchPosts = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/get-posts?${searchQuery}`)
            if (!res.ok) {
                setLoading(false)
                return;
            }
            if (res.ok) {
                const { posts } = await res.json()
                setPosts(posts)
                setLoading(false)
                if (posts.length === 9)
                    setShowMore(true)
                else
                    setShowMore(false)
            }
        }
        fetchPosts()
    }, [search])
    const handleChange = (e) => {
        if (e.target.id === 'searchItem')
            setSideBarData({ ...sideBarData, searchItem: e.target.value })
        if (e.target.id === 'sort')
            setSideBarData({ ...sideBarData, sort: e.target.value || 'desc' })
        if (e.target.id === 'category')
            setSideBarData({ ...sideBarData, category: e.target.value || 'uncategorized' })

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(search)
        urlParams.set('searchItem', sideBarData.searchItem)
        urlParams.set('sort', sideBarData.sort)
        urlParams.set('category', sideBarData.category)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
    const handleShowMore = async () => {
        const numberOfPosts = posts.length
        const startIndex = numberOfPosts
        const urlParams = new URLSearchParams(search)
        urlParams.set('startIndex', startIndex)
        const searchQuery = urlParams.toString()
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/get-posts?${searchQuery}`)
        if (!res.ok)
            return;
        if (res.ok) {
            const { posts } = await res.json()
            setPosts(prev => [...prev, ...posts])
            if (posts.length === 9)
                setShowMore(true)
            else setShowMore(false)
        }
    }
    return (
        <div className='flex flex-col md:flex-row'>
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-semibold'>Search Term</label>
                        <TextInput placeholder='Search...' id='searchItem' type='text' value={sideBarData.searchItem || ''} onChange={handleChange} />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='font-semibold'>Sort : </label>
                        <Select onChange={handleChange} value={sideBarData.sort || ''} id='sort'>
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='font-semibold'>Category : </label>
                        <Select onChange={handleChange} value={sideBarData.category || ''} id='category'>
                            <option value='uncategorized'>uncategorized</option>
                            <option value='DevOps'>DevOps</option>
                            <option value='AI'>AI</option>
                            <option value='DSA'>DSA</option>
                            <option value='JavaScript'>JavaScript</option>
                            <option value='React.js'>React.js</option>
                            <option value='React-native.js'>React-native.js</option>
                            <option value='Node'>Node.js</option>
                            <option value='Others'>Others</option>
                        </Select>
                    </div>
                    <Button type='submit' outline gradientDuoTone='purpleToPink'>
                        Apply Filters
                    </Button>
                </form>
            </div>
            <div className="w-full">
                <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Post results:</h1>
                <div className="p-7 flex-wrap gap-4">
                    {
                        !loading && posts.length === 0 && <p className='text-xl text-gray-500'>No posts found.</p>
                    }
                    {
                        loading && (
                            <div className='flex justify-center items-center min-h-screen'>
                                <Spinner size='xl' />
                            </div>
                        )
                    }
                    {
                        <div className="flex flex-wrap gap-4 justify-center items-center">
                            {
                                !loading && posts && posts.map(post => (
                                    <PostCard key={post._id} post={post} />
                                ))
                            }
                        </div>
                    }
                    {
                        showMore && <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'>Show More</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Search