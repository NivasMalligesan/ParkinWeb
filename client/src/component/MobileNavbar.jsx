import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import assets from '../assets/assets';
import { Car, Contact, Globe, HistoryIcon, Home, Instagram, Linkedin, List, ParkingCircle } from 'lucide-react';


const MobileNavbar = () => {
        const location = useLocation();
  return (
    <div>
        <div className={` md:hidden bottom-0 w-full fixed  right-0 pb-2 z-20 overflow-hidden bg-white transition-all shadow`}>
            
            <ul className='flex items-start gap-1 mt-5 px-2  text-lg font-medium'>
                <NavLink to={'/'} onClick={() => setShowMenu(false)} className={`${location.pathname === '/' ? 'bg-primary text-white  cursor-pointer' : 'cursor-pointer w-full '} rounded flex flex-col items-center w-full   rounded p-3 text-nowrap `}>
                    <Home className='text-primary' size={20} />
                    <p className=" rounded text-xs  ">Home</p>
                </NavLink>
                <NavLink to={'/parkings'} onClick={() => setShowMenu(false)} className={`${location.pathname === '/parkings' ? ' bg-primary cursor-pointer text-white ' : 'cursor-pointer w-full  '} flex flex-col items-center w-full   rounded p-3 text-nowrap`}>
                    <ParkingCircle className='text-primary' size={20} />
                    <p className=" rounded  text-xs">All Parkings</p>
                </NavLink>
                <NavLink to={'/my-bookings'} onClick={() => setShowMenu(false)} className={`${location.pathname === '/my-bookings' ? ' bg-primary cursor-pointer text-white ' : 'cursor-pointer w-full  '}rounded flex flex-col items-center w-full  p-3 text-nowrap`}>
                    <HistoryIcon className='text-primary' size={20} />
                    <p className="rounded text-xs">My Bookings</p>
                </NavLink>
                <NavLink to={'/contact'} onClick={() => setShowMenu(false)} className={`${location.pathname === '/contact' ? ' bg-primary cursor-pointer text-white w-full ' : 'cursor-pointer w-full  '}rounded flex flex-col items-center w-full  p-3 text-nowrap`}>
                    <Contact className='text-primary' size={20} />
                    <p className=" rounded text-xs">Contact</p>
                </NavLink>
                <NavLink to={'/my-profile'} onClick={() => setShowMenu(false)} className={`${location.pathname === '/contact' ? ' bg-primary cursor-pointer text-white w-full ' : 'cursor-pointer w-full  '}rounded flex flex-col items-center w-full  p-3 text-nowrap`}>
                    <Contact className='text-primary' size={20} />
                    <p className=" rounded text-xs">Profile</p>
                </NavLink>
            </ul>

                </div>
    </div>
  )
}

export default MobileNavbar