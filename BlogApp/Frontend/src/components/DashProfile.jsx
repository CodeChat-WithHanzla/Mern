import { useSelector } from 'react-redux'
import { Alert, Button, TextInput } from 'flowbite-react'
import { useRef, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css';
import {
    updateStart,
    updateSuccess,
    updateFailure,
} from '../slices/userSlice'
import { useDispatch } from 'react-redux';
function DashProfile() {
    const { currentUser } = useSelector(state => state.user)
    const [imgUrl, setImgUrl] = useState(null)
    const [uploadError, SetUploadError] = useState(null)
    const [formData, setFormData] = useState({})
    const filePickerRef = useRef()
    const dispatch = useDispatch();
    const handleChange = (e) => {
        if (uploadError)
            SetUploadError(null)
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
        SetUploadError(null)
        e.preventDefault()
        if (Object.keys(formData).length === 0)
            return;
        const payload = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, value)
        })
        try {
            dispatch(updateStart());
            const response = await fetch(`/api/v1/update/${currentUser?._id}`, {
                method: 'PUT',
                body: payload
            });
            const { data, status, message } = await response.json();
            if (status === false) {
                dispatch(updateFailure(message))
                return SetUploadError("An error occurred while uploading. Please try again")
            }
            else {
                dispatch(updateSuccess(data))
            }

        } catch (error) {
            dispatch(updateFailure(error.message))
            SetUploadError(`Updating error :: ${error}`)
        }
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="file" accept='image/*' onChange={handleChange} ref={filePickerRef} hidden />
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative" onClick={() => filePickerRef.current.click()}>
                    <img src={imgUrl || currentUser?.ProfilePicture} alt="user" className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover `} />
                </div>
                {
                    uploadError && (
                        <Alert color='failure'>{uploadError}</Alert>
                    )
                }
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser?.username} onChange={handleChange} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser?.email} onChange={handleChange} />
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