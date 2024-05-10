import React from 'react';
import { useLocation } from 'react-router-dom';
import Notification from '../pages/Notification';

const NotificationWrapper = () => {
  const location = useLocation();
  const pathname = location.pathname.trim();
  const isSignInOrSignUpPage = pathname.endsWith("/sign-in") || pathname.endsWith("/sign-up");

  return (
    <>
      {!isSignInOrSignUpPage && <Notification />}
    </>
  );
} 

export default NotificationWrapper;
