import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import assets from '../assets/assets';
import { Globe, Instagram, Linkedin } from 'lucide-react';
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext';
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {token,setToken,userData} = useContext(AppContext);

    const logout = ()=>{
        setToken(false);
        localStorage.removeItem('token')
    }


    return (
        <motion.div 
         initial={{opacity:1,y:-100}}
        animate={{ opacity:1,y:0 }} // Animation when in view
        transition={{ duration: 0.5 }}
        viewport={{ once: true,}} 
        className='sticky top-0 z-50 bg-white w-full flex items-center justify-between py-2 px-1 mb-5 '>
            <h1 onClick={() => navigate('/')} className='text-3xl cursor-pointer font-semibold '>PARKin</h1>
            <ul className='hidden md:flex items-start gap-5 '>
            <NavLink to="/">
            <li className='py-1 '>Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary duration-200 w-3/5 m-auto hidden '/>
            </NavLink>
            <NavLink to="/parkings">
            <li className='py-1 '>Parkings</li>
            <hr className='border-none outline-none h-0.5 bg-primary duration-200 w-3/5 m-auto hidden '/>
            </NavLink>
            <NavLink to="/my-bookings">
            <li className='py-1 '>My Bookings</li>
            <hr className='border-none outline-none h-0.5 bg-primary duration-200 w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to="/contact">
            <li className='py-1 '>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary duration-200 w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
            <div className='flex items-center gap-4 text-sm'>
                {token && userData ?
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img src={userData.image } onClick={() => navigate('/my-profile')} alt="" className='group cursor-pointer w-8 h-8 rounded-full object-cover' />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/my-bookings')} className='hover:text-black cursor-pointer'>My Bookings</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div> :
                    <button onClick={() => navigate('/login')} className='cursor-pointer bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block '>Create Account</button>
                }
            </div>
        </motion.div>
    );
};

export default Navbar;
