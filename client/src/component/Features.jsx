import React, { useState } from 'react';
import { features } from '../assets/assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Features = () => {
  const [speed, setSpeed] = useState(40); // Default speed for smooth loop

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }} 
      className='flex flex-col sm:items-center sm:gap-4 py-5 px-2 sm:py-16 text-gray-800 overflow-hidden' 
      id='features'
    >
      <h1 className='sm:text-3xl font-medium'>Find By Features</h1>
      <p className='sm:w-1/3 hidden sm:block text-center text-sm'>
        Easily search for parking spaces With Our Extensive List of Features, Schedule Your Parking Hassle-free!
      </p>

      {/* Scrolling Container with Inner Shadow */}
      <div 
        className='relative w-full overflow-hidden sm:mt-5 before:absolute before:top-0 before:left-0 before:h-full before:w-15 before:bg-gradient-to-r before:from-white before:to-transparent before:z-10 after:absolute after:top-0 after:right-0 after:h-full after:w-15 after:bg-gradient-to-l after:from-white after:to-transparent after:z-10'
        onMouseEnter={() => setSpeed(40)} // Slow down on hover
        onMouseLeave={() => setSpeed(20)} // Normal speed when not hovered
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }} // Moves continuously left
          transition={{ repeat: Infinity, duration: speed, ease: 'linear' }} // Seamless looping effect
          className='flex flex-nowrap w-max'
        >
          {[...features, ...features].map((item, index) => ( // Duplicate for a smooth loop
            <Link 
              key={index} 
              to={`/parkings/${item.feature}`} 
              className='flex flex-col items-center rounded p-4 text-xs cursor-pointer flex-shrink-0 transition-all duration-1000 hover:scale-[1.05]'
            >
              <div className="w-72 bg-white shadow-lg rounded-2xl p-4">
                <div className="pb-2">
                  <p className="text-xs uppercase font-bold text-gray-500">Parkings</p>
                  <h4 className="font-bold text-lg mt-1">{item.feature}</h4>
                </div>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.feature}
                    className="object-cover w-full rounded-xl transition-all duration-1000 hover:scale-105"
                  />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Features;
