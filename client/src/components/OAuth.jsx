import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();   
    const navigate = useNavigate();
    const handleGoogleClick = async () =>{
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)

            // console.log(result);

            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    "Content-Type":'application/json',
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL,
                }),
            })
            const data = await res.json() 
            dispatch(signInSuccess(data))
            navigate("/")
        } catch (error) {
            console.log("could not sign in with google : ",error);
        }
    }

    return (
        <>
            <button
                type='button'
                onClick={handleGoogleClick}
                className="bg-[#DB4437] text-white font-semibold py-3 px-6 rounded-lg uppercase shadow-md hover:bg-[#d93025] transition duration-300">
                Continue with Google
            </button>

        </>
    )
}

export default OAuth