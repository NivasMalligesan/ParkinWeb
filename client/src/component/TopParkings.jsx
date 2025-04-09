import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const TopParkings = () => {
  const navigate = useNavigate();
  const { parking, currencySymbol } = useContext(AppContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }} // Animation when in view
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex flex-col sm:items-center gap-4 sm:my-10 text-gray-900 md:mx-10"
    >
      <h1 className="sm:text-3xl px-2 font-medium">Top Parkings To Book</h1>
      <p className="hidden sm:block sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of Trusted Partners
      </p>

      <div className="w-full grid grid-cols-1 items-center justify-center  md:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {parking.slice(0, 8).map((item, index) => (
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
              <span className="flex items-center gap-2 absolute top-3 right-3 bg-white text-green-500 px-3 py-1 rounded-full text-sm font-medium">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </span>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-500 mt-1">{item.location}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-gray-900">
                    {currencySymbol} {item.pricePerHour}/Hour
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="text-yellow-400">★★★★</div>
                  <div className="text-gray-300">★</div>
                  <span className="text-sm text-gray-600 ml-1">(42)</span>
                </div>
              </div>

              <button className="cursor-pointer w-full bg-primary text-white font-medium py-3 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/parkings");
          scrollTo(0, 0);
        }}
        className="cursor-pointer mt-10 px-12 py-3 bg-primary text-white rounded-full"
      >
        More
      </button>
    </motion.div>
  );
};

export default TopParkings;
