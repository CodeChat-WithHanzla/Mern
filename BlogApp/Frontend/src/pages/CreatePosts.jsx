import { useState } from 'react'
import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from "react-circular-progressbar";
import { Alert } from 'flowbite-react'
function CreatePosts() {
    const [ImgFile, setImgFile] = useState(null)
    const [imgHidden, setImgHidden] = useState(true)
    const [uploadProgress, setUploadProgress] = useState(0);
    const [Imgloading, setImgLoading] = useState(false);
    const [error, setError] = useState(null)
    const [formData, setFormData] = useState({})
    const handleImgChange = (e) => {
        setError(null)
        setImgLoading(false)
        setImgHidden(true)
        const file = e.target?.files?.[0]
        if (!file.type.startsWith('image/'))
            return setError('Invalid file type. Please upload an image.');
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
        setFormData({ ...formData, coverImage: ImgFile })
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
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a posts</h1>
            <form className='flex flex-col gap-4'>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />
                    <Select>
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
                {error && <Alert color='failure'>{error}</Alert>}
                {ImgFile && <img src={ImgFile} alt="uploaded Image" className="w-full h-72 object-cover" hidden={imgHidden} />}
                <ReactQuill theme='snow' placeholder='Write your blog post here.' className='h-72 mb-12' required />
                <Button className='submit' gradientDuoTone='purpleToPink'>Publish</Button>
            </form>
        </div>
    )
}

export default CreatePosts