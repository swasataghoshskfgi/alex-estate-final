
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Notification = () => {
    const [isVisible, setIsVisible] = useState(true);
    const handleClose = () => {
        setIsVisible(false);
    };


    return (
        <>
            {isVisible && (
                <div className="fixed top-48 right-8 bg-cyan-950 text-white px-4 py-2 rounded-md z-50 animate-bounce shadow-xl shadow-black border">
                    <div className="flex justify-between items-center px-6">
                        <span>Login to see more</span>
                        <button onClick={handleClose} className="absolute -top-2 -right-2 text-white font-bold text-2xl">
                            <span className="bg-red-700 rounded-full pb-1 text-white font-bold flex items-center justify-center" style={{ width: '24px', height: '24px' }}>
                                &times;
                            </span>
                        </button>
                    </div>
                    <div className="text-center p-2 pb-3">
                        <Link
                            onClick={handleClose}
                            className='font-semibold p-1 px-2 border border-slate-950 shadow-md shadow-white bg-slate-950 rounded-md hover:contrast-200 text-base '
                            to='/sign-in'
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Notification;
