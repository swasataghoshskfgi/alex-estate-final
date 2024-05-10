// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from "../src/pages/Home"
// import SignIn from './pages/SignIn';
// import About from './pages/About';
// import SignUp from './pages/SignUp';
// import Error from './pages/Error';
// import Profile from './pages/Profile';
// import Header from './components/Header';
// import PrivateRoute from './components/PrivateRoute';
// import CreateListing from './pages/CreateListing';
// import UpdateListing from './pages/UpdateListing';
// import Listing from './pages/Listing';

// const App = () => {
//   return (
//     <>
//       <BrowserRouter>
//         <Header />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/sign-in' element={<SignIn />} />
//           <Route path='/sign-up' element={<SignUp />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/listing/:listingId' element={<Listing />} />
//           <Route element={<PrivateRoute />}>
//             <Route path='/profile' element={<Profile />} />
//             <Route path='/create-listing' element={<CreateListing />} />
//             <Route path='/update-listing/:listingId' element={<UpdateListing />} />
//           </Route>
//           <Route path='*' element={<Error />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;













// import { BrowserRouter, Routes, Route ,useLocation} from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Home from "../src/pages/Home"
// import SignIn from './pages/SignIn';
// import About from './pages/About';
// import SignUp from './pages/SignUp';
// import Error from './pages/Error';
// import Profile from './pages/Profile';
// import Header from './components/Header';
// import PrivateRoute from './components/PrivateRoute';
// import CreateListing from './pages/CreateListing';
// import UpdateListing from './pages/UpdateListing';
// import Listing from './pages/Listing';
// import Search from './pages/Search';
// import Notification from './pages/Notification';

// const App = () => {
//   const { currentUser } = useSelector(state => state.user);

//   const location = useLocation();
//   const pathname = location.pathname;
//   const isSignInPage = pathname.endsWith("/sign-in");
//   const isSignUpPage = pathname.endsWith("/sign-up");

//   console.log(isSignUpPage);


//   return (
//     <>
//       <BrowserRouter>
//       {!currentUser && isSignInPage && isSignUpPage && <Notification/>}
//         <Header />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           {!currentUser && <Route path='/sign-in' element={<SignIn />} />}
//           {!currentUser && <Route path='/sign-up' element={<SignUp />} />}
//           <Route path='/about' element={<About />} />
//           <Route path='/listing/:listingId' element={<Listing />} />
//           <Route element={<PrivateRoute />}>
//             <Route path='/profile' element={<Profile />} />
//             <Route path='/create-listing' element={<CreateListing />} />
//             <Route path='/update-listing/:listingId' element={<UpdateListing />} />
//           </Route>
//           <Route path='/search' element={<Search />} />
          
//           {/* <Route path='*' element={<Error />} /> */}
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;





























import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from "../src/pages/Home"
import SignIn from './pages/SignIn';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import NotificationWrapper from './components/NotificationWrapper';

const App = () => {
  const { currentUser } = useSelector(state => state.user);

  return (
    <>
      <BrowserRouter>
        {!currentUser && <NotificationWrapper />}
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          {!currentUser && <Route path='/sign-in' element={<SignIn />} />}
          {!currentUser && <Route path='/sign-up' element={<SignUp />} />}
          <Route path='/about' element={<About />} />
          <Route path='/listing/:listingId' element={<Listing />} />
          <Route element={<PrivateRoute />}> 
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='/update-listing/:listingId' element={<UpdateListing />} />
          </Route>
          <Route path='/search' element={<Search />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
