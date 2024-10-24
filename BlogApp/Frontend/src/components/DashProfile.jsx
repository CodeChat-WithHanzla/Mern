import { useSelector } from 'react-redux'
import { Alert, Button, TextInput, Spinner, Modal } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import 'react-circular-progressbar/dist/styles.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {
    updateStart,
    updateSuccess,
    updateFailure,
    deleteStart,
    deleteSuccess,
    deleteFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure,
} from '../slices/userSlice'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import { HiCamera } from 'react-icons/hi'
function DashProfile() {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [Imgloading, setImgLoading] = useState(false);
    const { currentUser, error, loading } = useSelector(state => state.user)
    const [imgUrl, setImgUrl] = useState(null)
    const [formData, setFormData] = useState({})
    const filePickerRef = useRef()
    const dispatch = useDispatch();
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertColor, setAlertColor] = useState('success');
    const [modal, setModal] = useState(false)
    const [previewModal, setPreviewModal] = useState(false);
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
            simulateUploadProgress();
        }
        else
            setFormData((prevData) => ({ ...prevData, [id]: typeof value === 'string' ? value.trim() : value, }))
    }
    const simulateUploadProgress = () => {
        setImgLoading(true);
        setUploadProgress(0);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            if (progress <= 100) {
                setUploadProgress(progress);
            } else {
                clearInterval(interval);
                setImgLoading(false);
            }
        }, 100);

    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(formData).length === 0) {
            setAlertMessage('No data provided for update. Please fill out the form.')
            setAlertColor('failure')
            return dispatch(updateFailure('No data provided for update. Please fill out the form.'));
        }
        if (Object.values(formData).every(value => value === '')) {
            setAlertMessage('Fields are empty.');
            setAlertColor('failure');
            dispatch(updateFailure('Fields are empty.'));
            return;
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
    const handleDeleteUser = async () => {
        setModal(false)
        try {
            dispatch(deleteStart())
            const response = await fetch(`/api/v1/delete/${currentUser?._id}`, {
                method: 'DELETE'
            })
            const { message } = await response.json()
            if (!response.ok) {
                setAlertMessage(message)
                setAlertColor('failure')
                return dispatch(deleteFailure(message))
            }
            dispatch(deleteSuccess())
        } catch (error) {
            dispatch(deleteStart(error.message))
        }
    }
    const handleSignOut = async () => {
        try {
            dispatch(signOutStart())
            const res = await fetch('/api/v1/auth/signout', {
                method: 'POST'
            })
            const { message } = await res.json()
            if (!res.ok)
                return dispatch(signOutFailure(message))
            dispatch(signOutSuccess())
        } catch (error) {
            dispatch(signOutFailure(error.message))
        }
    }
    const handleImageClick = () => {
        setPreviewModal(true);
    };
    return (
        <div className='max-w-lg mx-auto p-3 w-full' onClick={() => (previewModal && setPreviewModal(false))}>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <input type="file" accept='image/*' onChange={handleChange} ref={filePickerRef} hidden />
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative">
                    <img src={imgUrl || currentUser?.ProfilePicture} alt="user" className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover `} onClick={handleImageClick} />
                    {Imgloading && (
                        <div className="absolute inset-0 flex justify-center items-center">
                            <div className="w-full h-full">
                                <CircularProgressbar value={uploadProgress} text={`${uploadProgress}%`} />
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-3 right-4 bg-white rounded-full p-1 shadow-md">
                        <HiCamera className="h-6 w-6 text-gray-500 cursor-pointer" onClick={() => filePickerRef.current.click()} />
                    </div>
                </div>
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser?.username} onChange={handleChange} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser?.email} onChange={handleChange} />
                <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
                <Button type='submit' gradientDuoTone="purpleToBlue" outline disabled={loading}>{loading ? (
                    <>
                        <Spinner size='sm' />
                        <span className='pl-3'>Loading...</span>
                    </>) : "Update"}</Button>
                {
                    currentUser?.isAdmin && (
                        <Link to='/create-posts'>
                            <Button type='button' gradientDuoTone='purpleToPink' className='w-full'>
                                Create a post
                            </Button>
                        </Link>
                    )
                }
            </form>
            <div className="flex justify-between text-red-500 mt-5 cursor-pointer">
                <span onClick={() => setModal(true)} className='cursor-pointer'>Delete Account</span>
                <span onClick={handleSignOut} className='cursor-pointer'>Sign Out</span>
            </div>
            {
                alertMessage && <Alert className='mt-5 animate-shake' color={alertColor}>{alertMessage}</Alert>
            }
            <Modal show={modal} onClose={() => setModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
                        <div className="flex justify-center gap-4">
                            <Button color='failure' onClick={handleDeleteUser}>Yes I'm sure</Button>
                            <Button color='gray' onClick={() => setModal(false)}>No,cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={previewModal} onClose={() => setPreviewModal(false)} popup size='md'>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <img src={imgUrl || currentUser?.ProfilePicture} alt="Preview" className="rounded-lg w-full h-auto" />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashProfile