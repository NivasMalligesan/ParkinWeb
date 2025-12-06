import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const TopParkings = () => {
  const navigate = useNavigate();
  const { parking, currencySymbol } = useContext(AppContext);

  // Helper function to get safe image URL
  const getSafeImageUrl = (url, name) => {
    if (!url || url === 'undefined' || url === 'null' || url.includes('undefined')) {
      const seed = encodeURIComponent(name || 'parking');
      return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=3B82F6`;
    }
    return url;
  };

  // Handle image error
  const handleImageError = (e, name) => {
    e.target.onerror = null;
    const seed = encodeURIComponent(name || 'parking');
    e.target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=3B82F6`;
  };

  if (!parking || parking.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6">
            <svg className="w-full h-full text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No Parking Available</h2>
          <p className="text-gray-500">Check back soon for parking spots!</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col items-center gap-6 my-10 text-gray-900"
    >
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Top Parkings To Book</h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto text-sm md:text-base">
          Browse through our extensive list of trusted parking partners
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
        {parking.slice(0, 8).map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => item._id && navigate(`/bookings/${item._id}`)}
            className="group cursor-pointer w-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
          >
            <div className="relative h-48 md:h-52 overflow-hidden">
              <img
                src={getSafeImageUrl(item.image, item.name)}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => handleImageError(e, item.name)}
              />
              <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>{item.available ? 'Available' : 'Unavailable'}</span>
              </div>
            </div>

            <div className="p-4 md:p-5">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 mb-1">
                {item.name}
              </h3>
              
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                <FaMapMarkerAlt className="w-3 h-3 flex-shrink-0" />
                <span className="line-clamp-1">{item.location}</span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {currencySymbol} {item.pricePerHour}/<span className="text-sm font-normal">hour</span>
                  </p>
                  <p className="text-xs text-gray-500">{item.totalCapacity} slots</p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({item.rating?.toFixed(1) || '4.2'})</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (item._id && item.available) {
                    navigate(`/bookings/${item._id}`);
                  }
                }}
                className={`w-full py-2.5 rounded-lg font-medium transition-colors ${item.available 
                  ? 'bg-primary text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                disabled={!item.available}
              >
                {item.available ? 'Book Now' : 'Unavailable'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {parking.length > 8 && (
        <button
          onClick={() => {
            navigate("/parkings");
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="mt-6 px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow"
        >
          View All Parkings ({parking.length})
        </button>
      )}
    </motion.div>
  );
};

export default TopParkings;