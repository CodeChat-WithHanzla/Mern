import { useSelector } from 'react-redux'
import { Alert, Button, TextInput, Spinner } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css';
import {
    updateStart,
    updateSuccess,
    updateFailure,
} from '../slices/userSlice'
import { useDispatch } from 'react-redux';
function DashProfile() {
    const { currentUser, error, loading } = useSelector(state => state.user)
    const [imgUrl, setImgUrl] = useState(null)
    const [formData, setFormData] = useState({})
    const filePickerRef = useRef()
    const dispatch = useDispatch();
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertColor, setAlertColor] = useState('success');
    const handleChange = (e) => {
        const { id, value, files } = e.target

        if (files && files[0]) {
            const file = files[0]
            if (!file.type.startsWith('image/')) {
                return ('Invalid file type. Please upload an image.');
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
        if (Object.keys(formData).length === 0) {
            setAlertMessage('No data provided for update. Please fill out the form.')
            setAlertColor('failure')
            return dispatch(updateFailure('No data provided for update. Please fill out the form.'));
        }
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
                setAlertMessage(message)
                setAlertColor('failure')
                return dispatch(updateFailure(message))
            }
            else {
                setAlertMessage('Profile updated successfully!')
                setAlertColor('success')
                dispatch(updateSuccess(data))
            }

        } catch (error) {
            dispatch(updateFailure(error.message))
                (`Updating error :: ${error}`)
        }
    }
    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage(null)
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [alertMessage])
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="file" accept='image/*' onChange={handleChange} ref={filePickerRef} hidden />
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative" onClick={() => filePickerRef.current.click()}>
                    <img src={imgUrl || currentUser?.ProfilePicture} alt="user" className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover `} />
                </div>
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser?.username} onChange={handleChange} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser?.email} onChange={handleChange} />
                <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
                <Button type='submit' gradientDuoTone="purpleToBlue" outline disabled={loading}>{loading ? (
                    <>
                        <Spinner size='sm' />
                        <span className='pl-3'>Loading...</span>
                    </>) : "Update"}</Button>
            </form>
            <div className="flex justify-between text-red-500 mt-5 cursor-pointer">
                <span>Delete Account</span>
                <span>Sign Out</span>
            </div>
            {
                alertMessage && <Alert className='mt-5 animate-shake' color={alertColor}>{alertMessage}</Alert>
            }
        </div>
    )
}

export default DashProfile