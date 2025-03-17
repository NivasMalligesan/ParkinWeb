import React from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"

const Banner = () => {
    const navigate = useNavigate();

    return (
        <motion.div 
            initial={{opacity:0,y:100}}
            whileInView={{ opacity: 1,y:0 }} 
            className='relative flex bg-black rounded-lg sm:px-10 px-6 md:px-14 lg:px-12 my-20 md:mx-10 shadow-inner' 
            style={{ backgroundImage: `url(${assets.premiumCars})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Black Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

            {/* Content */}
            <div className='relative flex-1 py-8 sm:py-10 md:py-16 lg:py-24 z-10'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white shadow-md drop-shadow-lg'>
                    <h1>Book Parking</h1>
                    <h1 className='mt-4'>With 100+ Trusted Partners</h1>
                </div>
                <button 
                    onClick={() => navigate('/login')}  
                    className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all '
                >
                    Create Account
                </button>
            </div>
        </motion.div>
    );
};

export default Banner;
