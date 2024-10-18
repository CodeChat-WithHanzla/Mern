import { useSelector } from 'react-redux'
import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function DashProfile() {
    const { currentUser } = useSelector(state => state.user)
    const [img, setImg] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [uploadProgress, SetImgProgress] = useState(null)
    const [uploadError, SetUploadError] = useState(null)

    const filePickerRef = useRef()
    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg(file);
            setImgUrl(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        if (img)
            uploadImg()
    }, [img])

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input type="file" accept='image/*' onChange={handleImgChange} ref={filePickerRef} hidden />
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative" onClick={() => filePickerRef.current.click()}>
                    {uploadProgress && (<CircularProgressbar value={uploadProgress || 0} text={`${uploadProgress}%`} strokeWidth={5} styles={{ root: { width: '100%', height: '100%', position: 'absolute' }, path: { stroke: `rgba(62,152,199,${uploadProgress / 100})` } }} />)}
                    <img src={imgUrl || currentUser.data.ProfilePicture} alt="user" className={`rounded-full w-full h-full border-8 border-[lightgray] object-cover ${uploadProgress && uploadProgress < 100 && 'opacity-60'}`} />
                </div>
                {
                    uploadError && (
                        <Alert color='failure'>{uploadError}</Alert>
                    )
                }
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.data.username} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.data.email} />
                <TextInput type='password' id='password' placeholder='password' />
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