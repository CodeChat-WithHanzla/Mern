import { useEffect, useState } from 'react'
import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from "react-circular-progressbar";
import { Alert, Spinner } from 'flowbite-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
function UpdatePosts() {
    const { currentUser } = useSelector(state => state.user)
    const [ImgFile, setImgFile] = useState(null)
    const [imgHidden, setImgHidden] = useState(true)
    const [uploadProgress, setUploadProgress] = useState(0);
    const [Imgloading, setImgLoading] = useState(false);
    const [error, setError] = useState(null)
    const [originalFile, setOriginalFile] = useState(null)
    const [formData, setFormData] = useState({})
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const navigate = useNavigate()
    const { postId } = useParams()
    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/get-posts?postId=${postId}`)
                const data = await res.json()


                if (!res.ok) {
                    setError(data.message)
                    return;
                }
                if (res.ok) {
                    setError(null)
                    setFormData(data.posts[0])
                    setImgFile(data.posts[0]?.coverImage)
                    setImgHidden(false)
                }
            }
            fetchPosts()
        } catch (error) {
            setError(error.message);
        }
    }, [postId])
    const handleImgChange = (e) => {
        setError(null)
        setImgLoading(false)
        setImgHidden(true)
        const file = e.target?.files?.[0]
        if (!file.type.startsWith('image/'))
            return setError('Invalid file type. Please upload an image.');
        setOriginalFile(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgFile(e.target.result)
        }


    }
    const handleImgUpload = () => {
        if (!ImgFile)
            return setError('Invalid file type. Please upload an image.');
        setImgLoading(true);
        simulateUploadProgress()
        setFormData({ ...formData, coverImage: originalFile })
    }
    const simulateUploadProgress = () => {
        setUploadProgress(0);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (progress <= 100) {
                setUploadProgress(progress);
            } else {
                clearInterval(interval);
                setImgHidden(false);
                setImgLoading(false);
            }
        }, 100);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setButtonDisabled(true)
        const payload = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value)
        })
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/update-posts/${postId}/${currentUser._id}`, {
                method: 'PUT',
                body: payload
            })
            if (!res.ok) {
                const { message } = await res.json()
                setError(message)
                setButtonDisabled(false)
                return;
            }
            const data = await res.json()
            navigate(`/posts/${data.slug}`)
        } catch (error) {
            setError(error.message)
        }
    }
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null)
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [error])
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update a posts</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput value={formData.title} type='text' placeholder='Title' required id='title' className='flex-1' onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        <option value='uncategorized'>Select a category</option>
                        <option value='DevOps'>DevOps</option>
                        <option value='AI'>AI</option>
                        <option value='DSA'>DSA</option>
                        <option value='JavaScript'>JavaScript</option>
                        <option value='React.js'>React.js</option>
                        <option value='React-Native.js'>React-Native.js</option>
                        <option value='Node.js'>Node.js</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-center border-4 border-teal-500 border-dotted p-3">
                    <FileInput type='file' accept='image/*' onChange={handleImgChange} />
                    {Imgloading ?
                        (
                            <div className='w-10 h-10 flex items-center justify-center'>
                                <CircularProgressbar
                                    value={uploadProgress}
                                    text={`${uploadProgress}%`}
                                />
                            </div>
                        ) : (
                            <Button
                                type="button"
                                gradientDuoTone="purpleToBlue"
                                size="sm"
                                outline
                                onClick={handleImgUpload}
                                className='w-32 h-10 flex items-center justify-center'
                            >Upload Image</Button>
                        )}

                </div>
                {ImgFile && !imgHidden && <img src={ImgFile} alt="uploaded Image" className="w-full h-72 object-cover" hidden={imgHidden} />}
                <ReactQuill value={formData.content || ''} onChange={(value) => { setFormData({ ...formData, content: value }) }} theme='snow' placeholder='Write your blog post here.' className='h-72 mb-12' required />
                <Button type='submit' gradientDuoTone='purpleToPink' disabled={buttonDisabled}>{buttonDisabled ? (
                    <>
                        <Spinner size='sm' />
                        <span className='pl-3'>Updating...</span>
                    </>) : "Update Post"}</Button>
                {error && <Alert className='mt-5 animate-shake' color='failure'>{error}</Alert>}
            </form>
        </div>
    )
}

export default UpdatePosts