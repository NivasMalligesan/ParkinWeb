import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import {motion} from 'motion/react'

const MyParkings = () => {
  const { parking } = useContext(AppContext);

  return (
    <motion.div 
    initial={{opacity:0,y:100}}
    animate={{opacity:1 , y:0}}
    className='mx-auto mt-12 sm:p-6 bg-white shadow-lg rounded-xl'>
      <p className='text-2xl font-semibold text-gray-800 border-b pb-3'>My Bookings</p>
      <div className='mt-4 space-y-6'>
        {parking.slice(0, 3).map((item, index) => (
          <div className='grid grid-cols-[2fr_2fr] sm:gap-4 lg:flex bg-gray-50 shadow-md rounded-lg overflow-hidden pl-2 pt-2 ' key={index}>
            <img className='w-full h-full sm:w-40 rounded object-cover' src={item.image} alt={item.name} />
            <div className='flex-1 p-4'>
              <p className='text-lg font-semibold text-gray-900'>{item.name}</p>
              <p className='text-gray-600 flex mt-2 items-center gap-2'><FaMapMarkerAlt  />{item.location}</p>
              <p className='text-gray-700 font-medium mt-2'>Address:</p>
              <p className='text-sm text-gray-500'>{item.address}</p>
              <p className='text-gray-700 mt-2 flex items-center gap-2'><FaCalendarAlt />23 November, 2025 | 8:30 AM</p>
            </div>
            <div>

            </div>
            <div className='flex flex-col justify-center items-end p-4 gap-3 mt-2'>
              <button className='w-full sm:w-40 py-2 rounded border hover:bg-[#14213d] hover:text-white  transition-all duration-300'>Pay Online</button>
              <button className='w-full  sm:w-40 py-2 rounded border hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Booking</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyParkings;
