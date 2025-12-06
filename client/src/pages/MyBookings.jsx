import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import {motion} from 'motion/react'
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const MyParkings = () => {
  const { backendUrl , token } = useContext(AppContext);
  const [booking,setBooking ] = useState([])
  const navigate = useNavigate()
  const months = ["","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormate = (slotDate) =>{
    const dateArray = slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])]+" "+dateArray[2]
  }

 const getUserBooking = async () =>{
    try {
      const {data} = await axios.get(backendUrl+'/api/user/booking',{headers:{token}})
      if(data.success){
        setBooking(data.bookings.reverse())
        console.log(data.app)
      }
    } catch (error) { 
      console.log(error);
      toast.error(error.message)      
    }
  }

  const cancelBooking = async (bookingId) =>{
    try {
      const {data} = await axios.post(backendUrl+'/api/user/cancel-booking',{bookingId},{headers:{token}})
      if(data.message){
        toast.success(data.message);
        getUserBooking()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)      
   
    }
  }

  const initPay = ({ order, key }) => {
  const options = {
    key: key || import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "PARKin Booking",
    description: "Parking Slot Booking Payment",
    order_id: order.id,
    handler: async (response) => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/user/verifyRazorpay`, 
          response, 
          { headers: { token } }
        );
        
        if (data.success) {
          toast.success("Payment successful!");
          getUserBooking();
        } else {
          toast.error(data.message || "Payment verification failed");
        }
      } catch (error) {
        console.error(error);
        toast.error("Payment verification error");
      }
    },
    theme: {
      color: "#14213d"
    }
  };

  const rzp = new window.Razorpay(options);

  rzp.on("payment.failed", (response) => {
    toast.error(`Payment failed: ${response.error.description}`);
  });

  rzp.open();
};

const bookingRazorpay = async (bookingId) => {
  try {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded");
      return;
    }

    const { data } = await axios.post(
      `${backendUrl}/api/user/payment-razorpay`,
      { bookingId },
      { headers: { token } }
    );

    if (data.success) {
      initPay({ order: data.order, key: data.key });
    } else {
      toast.error(data.message || "Failed to create payment order");
    }
  } catch (error) {
    console.error("Error in bookingRazorpay:", error);
    toast.error(error.response?.data?.message || "Payment failed");
  }
};

  



  useEffect(()=>{
    if(token){
      getUserBooking()
    }
  },[token])

  return (
    <motion.div 
    initial={{opacity:0,y:100}}
    animate={{opacity:1 , y:0}}
    transition={{opacity:1,duration:0.2}}
    className='mx-auto mt-12 sm:p-6 bg-white '>
      <p className='text-2xl font-semibold text-gray-800 border-b pb-3'>My Bookings</p>
      <div className='mt-4 space-y-6'>
      {Array.isArray(booking) && booking.length > 0 ? (
      booking.map((item, index) => (
     <div className='sm:flex justify-between bg-gray-50 shadow-md rounded-lg overflow-hidden pl-2 pt-2 '>
    <div className='grid grid-cols-[2fr_2fr] sm:gap-4 lg:flex ' >
      <img className='w-full h-full sm:w-40 sm:h-40 rounded object-cover' src={item.parkData?.image} alt={item.parkData?.name || "Parking Image"} />
      <div className='flex-1 p-4'>
        <p  className='text-lg font-semibold text-gray-900'>{item.parkData?.name}</p>
        <p className='text-gray-600 flex mt-2 items-center gap-2'><FaMapMarkerAlt  />{item.parkData?.location}</p>
        <p className='text-gray-700 font-medium mt-2'>Address:</p>
        <p className='text-sm text-gray-500'>{item.parkData?.address}</p>
        <p className='text-gray-700 mt-2 flex items-center gap-2'><FaCalendarAlt />Date And Time :  {slotDateFormate(item.slotDate)} | {item.slotTime}</p>
      </div>
    </div>
      <div className='flex flex-col justify-center items-end p-4 gap-3 mt-2'>
        {
          !item.cancelled && item.Payment &&
          <button className='w-full sm:w-40 py-2 rounded border transition-all duration-300'>Paid</button>
        }
      {
          !item.cancelled && !item.Payment && 
          <div className='flex  w-full gap-3'>

            <button onClick={()=>bookingRazorpay(item._id)} className='w-full sm:w-40 py-2 rounded border hover:bg-[#14213d] hover:text-white transition-all duration-300'>Pay Online</button>
            <button onClick={()=>bookingRazorpay(item._id)} className='w-full sm:w-40 py-2 rounded border hover:bg-[#14213d] hover:text-white transition-all duration-300'>View Details</button>
          </div>
      }{
          !item.cancelled && !item.Payment && !item.isCompleted &&
        <button onClick={()=>cancelBooking(item._id)} className='w-full sm:w-40 py-2 rounded border hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Booking</button>
        }
      
        {
          item.cancelled &&
        <button  className='w-full sm:w-40 py-2 rounded border border-red-600 text-red-600 transition-all duration-300'>Canceled Booking</button>
        }
        {
          item.isCompleted && 
          <button  className='w-full sm:w-40 py-2 rounded border border-green-600 text-green-600 transition-all duration-300'>Completed</button>
        }
      </div>

     </div>   
  ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No bookings found.</p>
      )}

      </div>
    </motion.div>
  );
};

export default MyParkings;
