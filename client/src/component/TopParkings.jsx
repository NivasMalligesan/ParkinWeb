import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const TopParkings = () => {
  const navigate = useNavigate();
  const { parking, currencySymbol } = useContext(AppContext);

  // Helper function to get safe image URL
  const getSafeImageUrl = (imageUrl, parkingName) => {
    if (!imageUrl || imageUrl === 'undefined' || imageUrl.includes('undefined')) {
      // Return a default parking image based on parking name
      const seed = encodeURIComponent(parkingName || 'parking');
      return `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=3B82F6`;
    }
    return imageUrl;
  };

  // Handle image loading errors
  const handleImageError = (e, itemName) => {
    e.target.onerror = null;
    const seed = encodeURIComponent(itemName || 'parking');
    e.target.src = `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=3B82F6`;
  };

  // If parking data is empty or loading
  if (!parking || parking.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 my-10 text-gray-900">
        <h1 className="text-2xl md:text-3xl font-medium">Top Parkings To Book</h1>
        <p className="text-gray-500 text-center max-w-md">
          No parking spots available at the moment. Please check back later.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-4 my-10 text-gray-900"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Top Parkings To Book</h1>
      <p className="text-gray-500 text-center max-w-2xl text-sm md:text-base">
        Simply browse through our extensive list of Trusted Partners
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5 px-4">
        {parking.slice(0, 8).map((item, index) => (
          <motion.div
            key={item._id || index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => item._id && navigate(`/bookings/${item._id}`)}
            className="cursor-pointer w-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={getSafeImageUrl(item.image, item.name)}
                alt={item.name || "Parking Spot"}
                className="w-full h-48 md:h-52 object-cover"
                onError={(e) => handleImageError(e, item.name)}
                loading="lazy"
              />
              <span className={`flex items-center gap-2 absolute top-3 right-3 bg-white ${item.available ? 'text-green-600' : 'text-red-600'} px-3 py-1.5 rounded-full text-xs font-medium shadow-sm`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>{item.available ? 'Available' : 'Unavailable'}</span>
              </span>
            </div>

            <div className="p-4 md:p-5 space-y-3">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-1">
                  {item.name || "Unnamed Parking"}
                </h3>
                <div className="flex items-center gap-1 text-gray-500 mt-1">
                  <FaMapMarkerAlt className="w-3 h-3" />
                  <p className="text-sm truncate">{item.location || "Location not specified"}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-lg md:text-xl font-bold text-gray-900">
                    {currencySymbol} {item.pricePerHour || 0}/Hour
                  </p>
                  <p className="text-xs text-gray-500">{item.totalCapacity || 0} slots available</p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">
                    ({item.rating || 4.2})
                  </span>
                </div>
              </div>

              <button 
                className={`w-full ${item.available ? 'bg-primary hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white font-medium py-2.5 rounded-lg transition-colors duration-300 mt-2`}
                disabled={!item.available}
                onClick={(e) => {
                  e.stopPropagation();
                  if (item._id && item.available) {
                    navigate(`/bookings/${item._id}`);
                  }
                }}
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
            window.scrollTo(0, 0);
          }}
          className="cursor-pointer mt-8 px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          View All Parkings ({parking.length})
        </button>
      )}
    </motion.div>
  );
};

export default TopParkings;