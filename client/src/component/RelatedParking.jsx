import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {motion} from 'motion/react'
const RelatedParking = ({ parkId, features }) => {
    const { parking } = useContext(AppContext);
    const [relPark, setRelPark] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (Array.isArray(parking) && parking.length > 0 && Array.isArray(features) && features.length > 0) {
            const uniqueParkings = new Set(); // Prevent duplicates

            const ParkingData = parking.filter((park) => {
                const isDifferentParking = park._id.toString() !== parkId.toString();
                const hasMatchingFeature = park.features.some(feature => features.includes(feature));

                if (isDifferentParking && hasMatchingFeature && !uniqueParkings.has(park._id)) {
                    uniqueParkings.add(park._id);
                    return true;
                }
                return false;
            });

            setRelPark(ParkingData);
        }
    }, [parking, features, parkId]);

    return (
        <motion.div 
        initial={{opacity : 0 , y:100}}
        whileInView={{opacity:1,y:0}}
        transition={{ duration: 0.5 }}
        viewport={{ once: true,}} 
        className='flex flex-col items-center gap-4 my-10 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Parkings To Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of Trusted Partners</p>

            <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relPark.slice(0, 5).map((item) => (
                    <div 
                        key={item._id} 
                        onClick={() => navigate(`/bookings/${item._id}`)} 
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                    >
                        <img className='bg-blue-50 w-full h-40 object-cover' src={item.image} alt={item.name} />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                <p>Available</p>
                            </div>
                            <p className='font-medium text-gray-900'>{item.name}</p>
                            <p className='text-xs text-gray-600'>{item.location}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => { navigate('/parkings'); scrollTo(0, 0); }} className='cursor-pointer mt-10 px-12 py-3 bg-primary text-white rounded-full'>
                More
            </button>
        </motion.div>
    );
};

export default RelatedParking;
