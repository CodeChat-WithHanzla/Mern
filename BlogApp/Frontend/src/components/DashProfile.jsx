import { useSelector } from 'react-redux'
import { Alert, Button, TextInput } from 'flowbite-react'
import { useRef, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function DashProfile() {
    const { currentUser } = useSelector(state => state.user)
    const [imgUrl, setImgUrl] = useState(null)
    const [uploadProgress, SetImgProgress] = useState(null)
    const [uploadError, SetUploadError] = useState(null)
    const [formData, setFormData] = useState({})


    const filePickerRef = useRef()
    const handleChange = (e) => {
        const { id, value, files } = e.target

        if (files && files[0]) {
            const file = files[0]
            if (!file.type.startsWith('image/')) {
                return SetUploadError('Invalid file type. Please upload an image.');
            }
            const reader = new FileReader()
            reader.onload = (e) => {
                setImgUrl(e.target.result)
            }
            reader.readAsDataURL(file)
            setFormData((prevData) => ({ ...prevData, ProfilePicture: file }))
        }
        else
            setFormData((prevData) => ({ ...prevData, [id]: typeof value === 'string' ? value.trim() : value, }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value)
        })
        try {
            const response = await fetch(`/api/v1/update/${currentUser.data._id}`, {
                method: 'PUT',
                body: payload
            });
            const data = await response.json()
            if (!data.success) return uploadError("An error occurred while uploading. Please try again")

        } catch (error) {
            SetUploadError('Updating error :: ', error)
        }
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="file" accept='image/*' onChange={handleChange} ref={filePickerRef} hidden />
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative" onClick={() => filePickerRef.current.click()}>
                    {uploadProgress && (<CircularProgressbar value={uploadProgress || 0} text={`${uploadProgress}%`} strokeWidth={5} styles={{ root: { width: '100%', height: '100%', position: 'absolute' }, path: { stroke: `rgba(62,152,199,${uploadProgress / 100})` } }} />)}
                    <img src={imgUrl || currentUser?.data?.ProfilePicture} alt="user" className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${uploadProgress && uploadProgress < 100 && 'opacity-60'}`} />
                </div>
                {
                    uploadError && (
                        <Alert color='failure'>{uploadError}</Alert>
                    )
                }
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.data.username} onChange={handleChange} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.data.email} onChange={handleChange} />
                <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
                <Button type='submit' gradientDuoTone="purpleToBlue" outline>Update</Button>
            </form>
            <div className="flex justify-between text-red-500 mt-5 cursor-pointer">
                <span>Delete Account</span>
                <span>Sign Out</span>
            </div>
        </div>
    )
}

export default DashProfile