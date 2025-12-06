import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token, setToken, userData } = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const logout = () => {
        setToken(null);
        setShowDropdown(false);
        navigate('/');
    };

    // Safe image source
    const getUserImage = () => {
        if (!userData?.image) {
            return <FaRegUserCircle className="w-8 h-8 text-gray-500" />;
        }
        return (
            <img 
                src={userData.image} 
                alt={userData.name || "User"} 
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<FaRegUserCircle className="w-8 h-8 text-gray-500" />';
                }}
            />
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 1, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='sticky top-0 z-50 bg-white w-full flex items-center justify-between py-3 px-4 md:px-6 mb-5 shadow-sm'
        >
            <h1 
                onClick={() => navigate('/')} 
                className='text-2xl md:text-3xl cursor-pointer font-bold text-gray-800'
            >
                PARK<span className='text-primary'>in</span>
            </h1>
            
            <ul className='hidden md:flex items-center gap-6 text-gray-600'>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `py-2 px-1 transition-colors ${isActive ? 'text-primary font-medium' : 'hover:text-primary'}`
                    }
                >
                    <li>Home</li>
                </NavLink>
                <NavLink 
                    to="/parkings" 
                    className={({ isActive }) => 
                        `py-2 px-1 transition-colors ${isActive ? 'text-primary font-medium' : 'hover:text-primary'}`
                    }
                >
                    <li>Parkings</li>
                </NavLink>
                <NavLink 
                    to="/my-bookings" 
                    className={({ isActive }) => 
                        `py-2 px-1 transition-colors ${isActive ? 'text-primary font-medium' : 'hover:text-primary'}`
                    }
                >
                    <li>My Bookings</li>
                </NavLink>
                <NavLink 
                    to="/contact" 
                    className={({ isActive }) => 
                        `py-2 px-1 transition-colors ${isActive ? 'text-primary font-medium' : 'hover:text-primary'}`
                    }
                >
                    <li>Contact</li>
                </NavLink>
            </ul>
            
            <div className='flex items-center gap-4'>
                {token && userData ? (
                    <div className='relative'>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className='flex items-center gap-2 cursor-pointer focus:outline-none'
                            aria-label="User menu"
                        >
                            {getUserImage()}
                            <span className='hidden md:inline text-sm font-medium text-gray-700'>
                                {userData.name?.split(' ')[0] || 'User'}
                            </span>
                            <svg 
                                className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {showDropdown && (
                            <>
                                <div 
                                    className="fixed inset-0 z-40" 
                                    onClick={() => setShowDropdown(false)}
                                />
                                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50'>
                                    <div className='p-4 border-b border-gray-100'>
                                        <p className='font-medium text-gray-900'>{userData.name}</p>
                                        <p className='text-sm text-gray-500 truncate'>{userData.email}</p>
                                    </div>
                                    <div className='p-2'>
                                        <button
                                            onClick={() => {
                                                navigate('/my-profile');
                                                setShowDropdown(false);
                                            }}
                                            className='w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors'
                                        >
                                            My Profile
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate('/my-bookings');
                                                setShowDropdown(false);
                                            }}
                                            className='w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors'
                                        >
                                            My Bookings
                                        </button>
                                        <button
                                            onClick={logout}
                                            className='w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors'
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <button 
                        onClick={() => navigate('/login')} 
                        className='bg-primary text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors text-sm md:text-base'
                    >
                        Create Account
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default Navbar;