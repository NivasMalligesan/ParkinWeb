import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Car, Contact, Globe, HistoryIcon, Home, Instagram, Linkedin, List, ParkingCircle, User } from 'lucide-react';

const MobileNavbar = () => {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 w-full right-0 pb-2 z-20 bg-white shadow transition-all">
      <ul className="flex justify-around mt-2 px-2 text-lg font-medium">
        <NavLink
          to="/"
          className={`${
            location.pathname === '/' ? 'bg-primary text-white' : ''
          } flex flex-col items-center w-full gap-1 rounded p-3 cursor-pointer`}
        >
          <Home className="text-primary" size={20} />
          <p className="text-xs">Home</p>
        </NavLink>

        <NavLink
          to="/parkings"
          className={`${
            location.pathname === '/parkings' ? 'bg-primary text-white' : ''
          } flex flex-col items-center w-full gap-1 rounded p-3 cursor-pointer`}
        >
          <ParkingCircle className="text-primary" size={20} />
          <p className="text-xs">All Parkings</p>
        </NavLink>

        <NavLink
          to="/my-bookings"
          className={`${
            location.pathname === '/my-bookings' ? 'bg-primary text-white' : ''
          } flex flex-col items-center w-full gap-1 rounded p-3 cursor-pointer`}
        >
          <HistoryIcon className="text-primary" size={20} />
          <p className="text-xs">My Bookings</p>
        </NavLink>

        <NavLink
          to="/contact"
          className={`${
            location.pathname === '/contact' ? 'bg-primary text-white' : ''
          } flex flex-col items-center w-full gap-1 rounded p-3 cursor-pointer`}
        >
          <Contact className="text-primary" size={20} />
          <p className="text-xs">Contact</p>
        </NavLink>

        <NavLink
          to="/my-profile"
          className={`${
            location.pathname === '/my-profile' ? 'bg-primary text-white' : ''
          } flex flex-col items-center w-full gap-1 rounded p-3 cursor-pointer`}
        >
          <User className="text-primary" size={20} />
          <p className="text-xs">Profile</p>
        </NavLink>
      </ul>
    </div>
  );
};

export default MobileNavbar;
