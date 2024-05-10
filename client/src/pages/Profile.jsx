// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import backgroundVideo from '../video/BLUE.mp4';
// import { useRef } from 'react';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable
// } from 'firebase/storage';
// import { app } from '../firebase';
// import {
//   updateUserSuccess,
//   updateUserStart,
//   updateUserFailure,
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   signOutUserStart,
//   signOutUserFailure,
//   signInSuccess
// } from '../redux/user/userSlice';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';



// const Profile = () => {
//   const fileRef = useRef(null);
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const [file, setFile] = useState(undefined);
//   const [filePerc, setFilePerc] = useState(0);
//   const [fileUploadError, setFileUploadError] = useState(false);
//   const [formData, setFormData] = useState({});
//   // console.log(formData);
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [showListingsError, setShowListingsError] = useState(false);
//   const [userListings, setUserListings] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (file) {
//       handelFileUpload(file);
//     }
//   }, [file]);

//   const handelFileUpload = (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setFilePerc(Math.round(progress));
//       },
//       (error) => {
//         setFileUploadError(true);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setFormData({ ...formData, avatar: downloadURL });

//           // Store the avatar URL in localStorage
//           localStorage.setItem('avatar', downloadURL);
//         });
//       }
//     );
//   };


//   const handelChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value })
//   }

//   const handelSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(updateUserFailure(data.message));
//         return;
//       }
//       dispatch(updateUserSuccess(data));
//       setUpdateSuccess(true)

//       // Start timer to reset updateSuccess state after 2 seconds
//       setTimeout(() => {
//         setUpdateSuccess(false);
//       }, 2000);

//     } catch (error) {
//       dispatch(updateUserFailure(error.message))
//     }
//   }



//   // const handelDeleteUser = async()=>{
//   //   try {
//   //     dispatch(deleteUserStart())
//   //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//   //       method: 'DELETE',
//   //     });
//   //     const data = await res.json();
//   //     if (data.success === false) {
//   //       dispatch(deleteUserFailure(data.message));
//   //       return;
//   //     }
//   //     dispatch(deleteUserSuccess(data));

//   //     // Start timer to reset updateSuccess state after 2 seconds
//   //     setTimeout(() => {
//   //       setUpdateSuccess(false);
//   //     }, 2000);
//   //   } catch (error) {
//   //     dispatch(deleteUserFailure(error.message))
//   //   }
//   // }

//   const handelDeleteUser = async () => {
//     // Show confirmation popup
//     const confirmed = window.confirm('Are you sure you want to delete your account?');

//     // If user confirms deletion
//     if (confirmed) {
//       try {
//         dispatch(deleteUserStart());
//         const res = await fetch(`/api/user/delete/${currentUser._id}`, {
//           method: 'DELETE',
//         });
//         const data = await res.json();
//         if (data.success === false) {
//           dispatch(deleteUserFailure(data.message));
//           return;
//         }
//         dispatch(deleteUserSuccess(data));

//       } catch (error) {
//         dispatch(deleteUserFailure(error.message));
//       }
//     }
//   };


//   const handleSignOut = async () => {
//     try {
//       dispatch(signOutUserStart());
//       const res = await fetch('/api/auth/signout');
//       const data = await res.json();
//       if (data.success === false) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//       localStorage.clear();
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   const handleShowListings = async () => {
//     try {
//       setShowListingsError(false);
//       const res = await fetch(`/api/user/listings/${currentUser._id}`);
//       const data = await res.json();
//       if (data.success === false) {
//         setShowListingsError(true);
//         return;
//       }
//       setUserListings(data);
//     } catch (error) {
//       setShowListingsError(true);
//     }
//   };

//   const handleListingDelete = async (listingId) => {
//     try {
//       const res = await fetch(`/api/listing/delete/${listingId}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         console.log(data.message);
//         return;
//       }

//       setUserListings((prev) =>
//         prev.filter((listing) => listing._id !== listingId)
//       );
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <>
//         <div className="flex justify-center items-center h-screen md:pt-40 ">
//           <div className=" max-w-3xl w-full px-8 py-3 shadow-2xl shadow-black rounded-lg text-center " >
//             <h1 className="text-3xl font-semibold text-white">Profile</h1>
//             <form
//               onSubmit={handelSubmit}
//               className="flex flex-col gap-4">
//               <input
//                 onChange={(e) => setFile(e.target.files[0])}
//                 type="file"
//                 ref={fileRef}
//                 hidden
//                 accept="image/*"
//               />

//               <img
//                 onClick={() => fileRef.current.click()}
//                 className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border border-2 border-white"
//                 src={formData?.avatar || currentUser.avatar}
//                 alt="Profile"
//               />

//               <p>
//                 {fileUploadError ? (
//                   <span className="text-red-700">Error Image Upload</span>
//                 ) : filePerc > 0 && filePerc < 100 ? (
//                   <span className="text-green-700">{`Uploading ${filePerc}%`}</span>
//                 ) : filePerc === 100 ? (
//                   <span className="text-green-700">Image Successfully Uploaded!</span>
//                 ) : (
//                   ""
//                 )}
//               </p>

//               <input
//                 type="text"
//                 placeholder="username"
//                 id="username"
//                 className="border p-3 rounded-lg"
//                 defaultValue={currentUser.username}
//                 onChange={handelChange}
//               />
//               <input
//                 type="email"
//                 placeholder="email"
//                 id="email"
//                 className="border p-3 rounded-lg"
//                 defaultValue={currentUser.email}
//                 onChange={handelChange}
//               />
//               <input
//                 type="password"
//                 placeholder="password"
//                 id="password"
//                 className="border p-3 rounded-lg"
//                 onChange={handelChange}
//               // defaultValue={currentUser.password}
//               />
//               <button
//                 disabled={loading}
//                 className="bg-blue-500 hover:opacity-95 text-white font-bold py-2 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out uppercase disabled:opacity-80">
//                 {loading ? 'Loading...' : 'Update'}
//               </button>
//               <Link
//                 className="bg-orange-700 hover:opacity-95 text-white font-bold py-2 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out uppercase disabled:opacity-80"
//                 to={'/create-listing'}>
//                 Create Listing
//               </Link>

//             </form>

//             <div className="flex justify-between px-4 mt-5">
//               <span
//                 onClick={handelDeleteUser}
//                 className="text-red-700 cursor-pointer font-semibold text-lg hover:underline">
//                 Delete Account
//               </span>
//               <span
//                 onClick={handleSignOut}
//                 className="text-red-700 cursor-pointer font-semibold text-lg hover:underline">
//                 Sign Out
//               </span>
//             </div>
//             <p className='text-red-700 mt-5'>
//               {error ? error : ''}
//             </p>
//             <p className='text-green-700 mt-5 text-lg font-semibold'>
//               {updateSuccess ? 'User Is Updated Successfully !' : ''}
//             </p>
//             <button
//               onClick={handleShowListings}
//               className="text-green-700 w-full">
//               Show Listings
//             </button>
//             <p className="text-red-700 mt-5">{showListingsError ? 'Error' : ''}</p>

//             {userListings && userListings.length > 0 &&
//               (
//                 <div className="flex flex-col gap-4">
//                   <h1 className='text-center mt-7 text-2xl font-semibold'>
//                     Your Listings
//                   </h1>
//                   {userListings.map((listing) => (
//                     <div
//                       key={listing._id}
//                       className='border rounded-lg p-3 flex justify-between items-center gap-4'
//                     >
//                       <Link to={`/listing/${listing._id}`}>
//                         <img
//                           src={listing.imageUrls[0]}
//                           alt='listing cover'
//                           className='h-16 w-16 object-contain'
//                         />
//                       </Link>
//                       <Link
//                         className='text-slate-700 font-semibold  hover:underline truncate flex-1'
//                         to={`/listing/${listing._id}`}
//                       >
//                         <p>{listing.name}</p>
//                       </Link>

//                       <div className='flex flex-col item-center'>
//                         <button
//                           onClick={() => handleListingDelete(listing._id)}
//                           className='text-red-700 uppercase'
//                         >
//                           Delete
//                         </button>
//                         <Link to={`/update-listing/${listing._id}`}>
//                           <button className='text-green-700 uppercase'>Edit</button>
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//           </div>
//         </div>
//     </>
//   );
// };

// export default Profile;

















































import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';



export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto custom-scrollbar'>
      <div className=" p-3 md:p-3 rounded-lg shadow-xl shadow-gray-900">
      <h1 className='text-3xl font-semibold text-center mt-2'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border-2  shadow-lg shadow-gray-900'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg  shadow-lg shadow-gray-900'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg  shadow-lg shadow-gray-900'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg  shadow-lg shadow-gray-900'
        />
        <button
                disabled={loading}
                className="bg-cyan-950 hover:opacity-95 text-white font-bold py-2 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out uppercase disabled:opacity-80   shadow-gray-900">
                {loading ? 'Loading...' : 'Update'}
              </button>
              <Link
                className="bg-orange-700 hover:opacity-95 text-white font-bold py-2 px-4 rounded-2xl shadow-md transition duration-300 ease-in-out uppercase disabled:opacity-80 text-center   shadow-gray-900"
                to={'/create-listing'}>
                Create Listing
              </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer '
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      <button onClick={handleShowListings} className='text-black w-full text-xl font-semibold rounded-full p-2   shadow-lg shadow-gray-900 '>
        Show Listings
      </button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-md p-3 flex justify-between items-center gap-4  shadow-lg shadow-gray-900'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold hover:underline overflow-hidden whitespace-no-wrap flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                 <FaTrash className="inline-block w-6" />
                 {/* Delete */}
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>
                  <FaEdit className="inline-block w-6" />
                  {/* Edit */}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}