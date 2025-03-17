import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import assets from '../assets/assets';
import RelatedParking from '../component/RelatedParking';
import { motion } from 'motion/react';

const Bookings = () => {
  const { parkId } = useParams();
  const { parking, currencySymbol } = useContext(AppContext);
  const [parkInfo, setParkInfo] = useState(null);
  const [parkSlots, setParkSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [noOfHours, setNoOfHours] = useState(0);
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  useEffect(() => {
    fetchParkInfo();
  }, [parking, parkId]);

  useEffect(() => {
    if (parkInfo) getAvailableSlots();
  }, [parkInfo]);

  const fetchParkInfo = async () => {
    if (!parking) return;
    const parkInfo = parking.find(park => park._id === Number(parkId));
    setParkInfo(parkInfo);
  };

  const getAvailableSlots = () => {
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let startTime = new Date(currentDate);
      startTime.setHours(0, 0, 0, 0);

      let endTime = new Date(currentDate);
      endTime.setHours(23, 59, 59, 999);

      if (i === 0) {
        let now = new Date();
        now.setMinutes(now.getMinutes() + (60 - (now.getMinutes() % 60))); // Next full hour
        now.setSeconds(0, 0);
        startTime = now;
      }

      let timeSlots = [];
      while (startTime < endTime) {
        let formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        timeSlots.push({
          datetime: new Date(startTime),
          time: formattedTime,
        });

        startTime.setHours(startTime.getHours() + 1); // Move to the next slot
      }

      if (timeSlots.length > 0) allSlots.push(timeSlots);
    }

    setParkSlots(allSlots);
  };

  return (
    parkInfo && (
      <div className="text-black">
        {/* Parking Details */}
        <div className="flex flex-col md:flex-row gap-4">
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
            <img className="w-full md:max-w-72 rounded-lg object-cover h-full" src={parkInfo.image} alt="" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} className="flex-3 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {parkInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>Location: {parkInfo.location}</p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{parkInfo.totalCapacity} Spots</button>
              <div className="flex items-center gap-2 text-xs text-green-500 border py-0.5 px-2 rounded-full">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>{parkInfo.availableSpots} Slots Available</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm mt-3 sm:mt-1">
              {parkInfo.features.map((item, index) => (
                <div key={index} className="sm:mt-2">
                  <p className="whitespace-nowrap text-xs text-white bg-primary px-3 py-0.5 rounded-full">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-sm font-medium text-gray-900 mt-4 flex items-center gap-1">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{parkInfo.description}</p>

            <p className="text-gray-500 font-medium mt-4">
              Parking Fee Per Hour: {currencySymbol}
              {parkInfo.pricePerHour}
              <span className="text-sm text-gray-600">/hour</span>
            </p>

          </motion.div>
        </div>

        {/* Booking Slots */}
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} className="md:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>

          {/* Day Selection */}
          <div className="flex gap-3 items-center w-full overflow-x-auto mt-4">
            {parkSlots.length > 0 &&
              parkSlots.map((item, index) => (
                <div key={index} className={`text-center py-6 min-w-[4rem] rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} onClick={() => setSlotIndex(index)}>
                  <p>{item.length > 0 ? daysOfWeek[item[0].datetime.getDay()] : ''}</p>
                  <p>{item.length > 0 ? item[0].datetime.getDate() : ''}</p>
                </div>
              ))}
          </div>

          {/* Start Time Selection */}
          <p className="font-semibold mt-4">Select Start Time:</p>
          <div className="text-nowrap flex items-center gap-3 w-full overflow-x-scroll">
            {parkSlots.length > 0 &&
              parkSlots[slotIndex].map((item, index) => (
                <p key={index}
                  onClick={() => {
                    setSelectedStartTime(item.time);
                    setSelectedEndTime('');
                    setNoOfHours(0); // Reset hours when selecting a new start time
                  }}
                  className={`text-sm font-light flex-shrink px-5 py-2 rounded-full cursor-pointer ${item.time === selectedStartTime ? 'bg-primary text-white' : 'border border-gray-200'
                    }`}>
                  {item.time}
                </p>
              ))}
          </div>

          {selectedStartTime && (
            <>
              <p className="font-semibold mt-4">Select End Time:</p>
              <div className="text-nowrap flex items-center gap-3 w-full overflow-x-scroll">
                {parkSlots.length > 0 &&
                  parkSlots[slotIndex]
                    .filter(item => item.time > selectedStartTime) // Only show times later than start time
                    .map((item, index) => (
                      <p key={index}
                        onClick={() => {
                          setSelectedEndTime(item.time);

                          // Calculate noOfHours
                          const startHour = parseInt(selectedStartTime.split(":")[0]);
                          const endHour = parseInt(item.time.split(":")[0]);
                          setNoOfHours(endHour - startHour);
                        }}
                        className={`text-sm font-light flex-shrink px-5 py-2 rounded-full cursor-pointer ${item.time === selectedEndTime ? 'bg-primary text-white' : 'border border-gray-200'
                          }`}>
                        {item.time}
                      </p>
                    ))}
              </div>
            </>
          )}

          {/* Display No of Hours */}
          {noOfHours > 0 && (
            <p className="mt-2 text-gray-600 font-medium">Total Hours: {noOfHours} hrs</p>
          )}

          {/* Book Slot Button */}
          <button className={`text-white text-sm font-light px-14 py-2.5 rounded-full my-6 w-1/2 ${selectedStartTime && selectedEndTime ? 'bg-primary' : 'bg-gray-400'}`} disabled={!selectedStartTime || !selectedEndTime}>
            Book Slot ({selectedStartTime} - {selectedEndTime})
          </button>
        </motion.div>

        {/* Related Parking */}
        <RelatedParking parkId={parkId} features={parkInfo.features} />
      </div>
    )
  );
};

export default Bookings;
