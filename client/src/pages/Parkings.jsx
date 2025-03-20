import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FilterIcon } from 'lucide-react';
import {motion} from 'motion/react'
const Parkings = () => {
  const { features } = useParams();
  const { parking,currencySymbol } = useContext(AppContext);
  const [filterPark, setFilterPark] = useState([]);
  const navigate = useNavigate();
  const [showFilter,setShowFilter] = useState(false);

  

  const applyFilter = () => {
    if (features) {
      const selectedFeatures = features.split(','); 
      setFilterPark(
        parking.filter(park => 
          selectedFeatures.every(feature => park.features.includes(feature))
        )
      );
    } else {
      setFilterPark(parking);
    }
  };

  const renderStars = (rating) => {
    return [...Array(Math.floor(rating))].map((_, i) => (
      <span key={i} className="text-yellow-400">★</span>
    ));
};



  useEffect(() => {
    applyFilter();
  }, [features, parking]);

  return (
    <div>
      <p className='text-gray-600 '>Browse Through the Parkings</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button onClick={()=>setShowFilter(prev => !prev)} className={`flex gap-2 items-center py-1 px-3 border rounded text-sm transition-all cursor-pointer sm:hidden ${showFilter ? 'bg-primary text-white ' : ''}`}><FilterIcon size={18}/> Filters</button>
        <motion.div
        initial={{opacity:0,x:-100}}
        animate={{opacity:1,x:0}}
        viewport={{once:true}}
        className={` flex-1 flex-col gap-4 text-sm txt-gray-600 ${showFilter ? 'flex ' : 'hidden sm:flex'} `}>
          <p onClick={()=>features === 'Parkings Near Me' ?navigate('/parkings') : navigate('/parkings/Parkings Near Me')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${features=== "Parkings Near Me" ? "bg-primary text-white " : ""}`}>Parkings Near Me</p>
          <p onClick={()=>features === 'Rent Parking' ?navigate('/parkings') : navigate('/parkings/Rent Parking')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${features=== "Rent Parking" ? "bg-primary text-white " : ""}`}>Rent Parking</p>
          <p onClick={()=>features === 'EV Charging' ?navigate('/parkings') : navigate('/parkings/EV Charging')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${features=== "EV Charging" ? "bg-primary text-white " : ""}`}>EV Charging</p>
          <p onClick={()=>features === 'Car Wash' ?navigate('/parkings') : navigate('/parkings/Car Wash')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${features=== "Car Wash" ? "bg-primary text-white " : ""}`}>Car Wash</p>
          <p onClick={()=>features === 'Handicap Accessible' ?navigate('/parkings') : navigate('/parkings/Handicap Accessible')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${features=== "Handicap Accessible" ? "bg-primary text-white " : ""}`}>Handicap Accessible</p>
          <p onClick={()=>features === 'Valet Available' ?navigate('/parkings') : navigate('/parkings/Valet Available')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${features=== "Valet Available" ? "bg-primary text-white " : ""}`}>Valet Available</p>
          <p onClick={()=>features === 'Bike Parking' ?navigate('/parkings') : navigate('/parkings/Bike Parking')} className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${features=== "Bike Parking" ? "bg-primary text-white " : ""}`}>Bike Parking</p>
        </motion.div>
        <motion.div
        initial={{opacity:0,y:100}}
        animate={{opacity:1,y:0}}
        viewport={{once:true}}
        
        className='w-full flex-4 grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-6 '>
          {filterPark.map((item, index) => (
            <div
            key={index}
            onClick={() => navigate(`/bookings/${item._id}`)}
            className="cursor-pointer  w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
              />
              <span className={`flex items-center gap-2 absolute top-3 right-3 bg-white ${item.available ? 'text-green-500' :'text-red-500' } px-3 py-1 rounded-full text-sm font-medium`}>
                <p className={`w-2 h-2  ${item.available ? 'bg-green-500' :'bg-red-500' } rounded-full`}></p>
                <p>{item.available ? 'Available' :'Unavailable' }</p>
              </span>
            </div>

            <div className="p-5 space-y-2">
              <div>
                <h3 className=" text-xl font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-500 mt-1">{item.location}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="">
                  <p className="text-lg font-semibold text-gray-900">
                    {currencySymbol} {item.pricePerHour}/Hour
                  </p>
                </div>

                <div className="flex items-center gap-1">
                   <div>
                    <div className="flex">{renderStars(item.rating)}</div>

                   </div>
                    <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                </div>
              </div>
              {item.available &&
              
              <button className="cursor-pointer w-full bg-primary text-white font-medium py-3 rounded-lg transition-colors">
                Book Now
              </button>
              }
            </div>
          </div>
          ))}
        </motion.div>
      </div>

   
    </div>
  );
};

export default Parkings;
