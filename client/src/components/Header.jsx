import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Header = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    return (
        <header className='bg-slate-950 shadow-lg shadow-cyan-950'>
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to='/'>
                    <h1 className="font-bold text-2xl sm:text-3xl flex flex-wrap">
                        <span className="text-white pr-2">{"{"}</span>
                        <span className="text-cyan-400 ">{"A "}</span>
                        <span className="text-amber-600">{" Estate "} </span>
                        <span className="text-white pl-2">{" }"}</span>

                    </h1>
                </Link>
                <form
                    onSubmit={handleSubmit}
                    className='bg-slate-100 p-2 rounded-lg flex items-center text-cyan-950 font-serif font-semibold shadow-md  shadow-cyan-600'>
                    <input
                        className='bg-transparent focus:outline-none w-36 sm:w-64'
                        type="text"
                        placeholder='Search ...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className='text-slate-950' />
                    </button>
                </form>
                <ul className='flex gap-4 '>
                    <Link to='/'>
                        <li className='hidden sm:inline text-amber-600 text-lg hover:underline hover:cursor-pointer '>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-amber-600 text-lg hover:underline hover:cursor-pointer '>About</li>
                    </Link>

                    <Link
                        className='flex'
                        to='/profile'>
                        {currentUser ? (
                            <img
                                className='w-8 h-8 rounded-full object-cover'
                                src={currentUser.avatar}
                                alt="profile"
                                style={{ boxShadow: '0 0 10px rgb(0, 26, 255)' }}
                            />

                        ) :
                            <li className='text-amber-600 text-lg hover:underline hover:cursor-pointer '>Sign In</li>
                        }
                        {currentUser?(
                            <span className='bg-green-700 h-2.5 w-2.5 rounded-full -top-4 -right-5' ></span>
                        ):''}
                    </Link>

                </ul>
            </div>
        </header>
    );
}

export default Header;




