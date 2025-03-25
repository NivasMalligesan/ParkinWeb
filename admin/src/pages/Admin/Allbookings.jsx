import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import assets from '../../assets/assets';

const Allbookings = () => {

  const {aToken,bookings,getAllBooking,cancleBooking} = useContext(AdminContext);
  const {slotDateFormate,currencySymbol} = useContext(AppContext)
  useEffect(()=>{
    getAllBooking()
  },[aToken])


 
    
  return (
    <div className='w-full  ml-20 md:ml-40 lg:ml-65 py-5 max-w-6xl m-5' >
      <p className='mb-3 text-lg font-medium'>All Bookings</p>
      <div className='bg-white shadow rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='text-center hidden sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_1fr_3fr] grid-flow-col py-3 px-6 border-b border-gray-300'>
            <p>#</p>
            <p>User</p>
            <p>Date & time</p>
            <p>Parkings</p>
            <p>Price</p>
            <p>Action</p>
        </div>
        {bookings.reverse().map((item,index)=>(
          <div className='flex text-center flex-wrap justify-between max-sm:gap-2 lg:grid lg:grid-cols-[0.5fr_3fr_3fr_3fr_1fr_3fr] items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-100' key={index}>
            <p className='max-lg:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 object-cover rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p>{slotDateFormate(item.slotDate)} | {item.slotTime}</p>
            <div className='flex items-center justify-between gap-2 mt-3 w-full'>
              <div className='flex gap-1 justify-center items-center'>
              <img className='w-8 h-8 object-cover rounded-full' src={item.parkData.image} alt="" />
              <p>{item.parkData.name}</p>
              </div>

              <p className='lg:hidden'>{currencySymbol} {item.amount}</p>
            </div>
            <p className='hidden lg:block'>{currencySymbol} {item.amount}</p>
            {
              item.cancelled 
              ?
               <p className='text-red-600 mt-5 lg:mt-0 text-center rounded-full'>Cancelled</p> 
               : <div className='flex items-center mt-5 lg:mt-0 justify-center gap-2'>
                <p className='text-green-600 border flex justify-center py-1 px-2 rounded-full border-green-600 bg-green-100  '>Booked</p> 
                <p  onClick={()=>cancleBooking(item._id)} className='text-red-600 border py-1 px-2 rounded-full cursor-pointer border-red-600 bg-red-100  '>Cancel Booking</p> 
            </div>
            }
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Allbookings