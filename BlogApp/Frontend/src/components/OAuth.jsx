import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { Button } from 'flowbite-react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../slices/userSlice'
function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const hangleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            dispatch(signInStart())
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/googleOAuth`, {
                method: 'Post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL
                })
            })
            const { data, message } = await res.json()
            if (!res.ok)
                return dispatch(signInFailure(message))

            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }

        } catch (error) {
            console.log(error.message);

        }
    }
    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={hangleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    )
}

export default OAuth