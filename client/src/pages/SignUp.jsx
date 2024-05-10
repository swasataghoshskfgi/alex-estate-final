import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import backgroundVideo from '../video/BLUE.mp4'
import signup from '../image/SIGN-UP.png';
import OAuth from '../components/OAuth';


const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  const handelChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value,
      })
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(formData),
        })
      const data = await res.json();
      if (data.success == false) {
        setError(data.message)
        setLoading(false)
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    }
    catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <>

      <div>

        <div className="relative flex items-center justify-center h-screen">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 object-cover w-full h-full"
          >
            <source src={backgroundVideo} type="video/mp4" />
            {/* Your browser does not support the video tag. */}
          </video>
          {/* Content */}
          <div className="z-10 max-w-4xl w-full p-8 bg-black bg-opacity-75 shado shadow-2xl shadow-black rounded-lg text-center border border-4 border-cyan-900">
            <h1 className="text-4xl text-center font-semibold mb-4 text-white">
              Sign Up
            </h1>
            <div className='grid sm:grid-cols-2'>


              <div className="w-80 pb-2">
                <img
                  className='border border-4 rounded-full hover:scale-110 hover:duration-1000 hover:cursor-pointer hover:contrast-125  hover:shadow-cyan-500 hover:shadow-2xl '
                  src={signup}
                  alt="signup" />
              </div>



              <div className='p-3 max-w-lg '>

                <form
                  onSubmit={handelSubmit}
                  className='flex flex-col gap-4 text-black font-sans max-w-full'>
                  <input
                    required
                    type="text"
                    placeholder='Username'
                    className='border p-3 rounded-lg'
                    id='username'
                    onChange={handelChange}
                  />

                  <input
                    required
                    type="email"
                    placeholder='Email'
                    className='border p-3 rounded-lg'
                    id='email'
                    onChange={handelChange}
                  />

                  <input
                    required
                    type="text"
                    placeholder='Password'
                    className='border p-3 rounded-lg'
                    id='password'
                    onChange={handelChange}
                  />

                  <button
                    disabled={loading}
                    className='bg-gray-300 text-[18px] text-black font-semibold p-3 rounded-2xl uppercase hover:opacity-90 disabled:opacity-80 '>
                    {loading ? 'Loading...' : 'Sign Up'}
                  </button>

                  <OAuth/>


                </form>
                <div className="flex gap-2 mt-5 ml-2">
                  <p className='text-white'>Have an account?</p>
                  <Link to="/sign-in">
                    <span className='text-blue-700 hover:underline'>Sign In</span>
                  </Link>
                </div>
                {error && <p className='text-red-500 mt-5'>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp