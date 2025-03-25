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
    const [showMenu, setShowMenu] = useState(false);
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
            <NavLink to="/contact">
            <li className='py-1 '>Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary duration-200 w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to="/about">
            <li className='py-1 '>About</li>
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
                <img src={assets.menu_icon} className='cursor-pointer w-6 md:hidden' alt="" onClick={() => setShowMenu(true)} />
                {/* Mobile Menu */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 pb-5 z-20 overflow-hidden bg-white transition-all shadow`}>
                    <div className='flex items-center justify-between p-4'>
                        <h1 onClick={() => setShowMenu(false)} className='text-3xl cursor-pointer font-semibold '>PARKin</h1>
                        <img  className='cursor-pointer w-7 ' src={assets.cross_icon} onClick={() => setShowMenu(false)} alt="" />
                    </div>
                    <ul className='flex flex-col items-start gap-2 mt-5 px-5 pb-4 text-lg font-medium'>
                        <NavLink to={'/'} onClick={() => setShowMenu(false)} className={`${location.pathname === '/' ? 'bg-primary text-white  cursor-pointer w-full py-2 rounded' : 'cursor-pointer w-full rounded'}`}>
                            <p className="px-4  py-1 rounded  ">Home</p>
                        </NavLink>
                        <NavLink to={'/parkings'} onClick={() => setShowMenu(false)} className={`${location.pathname === '/parkings' ? 'bg-primary cursor-pointer text-white w-full  py-2 rounded' : 'cursor-pointer w-full rounded'}`}>
                            <p className="px-4 py-1 rounded ">All Parkings</p>
                        </NavLink>
                        <NavLink to={'/contact'} onClick={() => setShowMenu(false)} className={`${location.pathname === '/contact' ? 'bg-primary cursor-pointer text-white w-full  py-2 rounded' : 'cursor-pointer w-full rounded'}`}>
                            <p className="px-4 py-1 rounded">Contact</p>
                        </NavLink>
                        <NavLink to={'/about'} onClick={() => setShowMenu(false)} className={`${location.pathname === '/about' ? 'bg-primary cursor-pointer text-white  w-full py-2 rounded' : 'cursor-pointer w-full rounded'}`}>
                            <p className="px-4 py-1 rounded">About</p>
                        </NavLink>
                    </ul>
                    <div className='flex ml-10 mt-3'>

                    <div className="flex space-x-6 ">
                        <a 
                        href="https://www.linkedin.com/in/nivas-malligesan/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                        >
                        <Linkedin className="w-6 h-6 text-black hover:text-black" />
                        </a>
                        
                        <a 
                        href="https://www.instagram.com/nivas_ig/profilecard/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                        >
                        <Instagram className="w-6 h-6 text-black hover:text-black" />
                        </a>
                        
                        <a 
                        href="https://nivas-portfolio-in.netlify.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                        >
                        <Globe className="w-6 h-6 text-black hover:text-black" />
                        </a>
                    </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
