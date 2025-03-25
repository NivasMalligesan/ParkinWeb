import React, { useContext, useEffect } from 'react'
import { ParkingContext } from '../../context/ParkingContext'
import { AppContext } from '../../context/AppContext'

const ParkingBookings = () => {
  const { pToken, bookings, setBookings, getBookings ,completeBooking, cancelBooking} = useContext(ParkingContext)
  const { slotDateFormate, currencySymbol } = useContext(AppContext)
  useEffect(() => {
    if (pToken) {
      getBookings()
    }
  }, [pToken])
  return (
    <div className='w-full  ml-25 md:ml-40 lg:ml-65 py-5 max-w-6xl m-5 '>
      <p className='mb-3 text-lg font-medium'>All bookings</p>
      <div className='bg-white border text-center border-gray-200 min-h-[50vh] text-sm max-h-[80vh] overflow-y-scroll rounded-xl'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_2fr] gap-1 py-3 px-2 border-b border-gray-300'>
          <p>#</p>
          <p>User</p>
          <p>Payment Status</p>
          <p>Date & Time</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {
          bookings.reverse().map((item, index) => (
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_2fr] gap-1 items-center text-gray-500 border-b border-gray-300 px-3 py-3 hover:bg-gray-100'>
              <p className='max-sm:hidden'>{index + 1}</p>
              <div className='flex justify-center items-center gap-2 '>
                <img className='w-8 h-8 object-cover rounded-full' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-sm inline border border-primary px-2 rounded-full '>
                  {item.Payment ? 'Online' : 'Cash'}
                </p>
              </div>
              <p>{slotDateFormate(item.slotDate)} , {item.slotTime}</p>
              <p><span className='sm:hidden'> Amount :</span> {currencySymbol}{item.amount}</p>
              {
                item.cancelled ?
                <p className='text-red-500'>
                  Cancelled
                </p>
                :
                item.isCompleted ?
                  <p className='text-green-500'>Completed</p>
                  :
                  <div className="flex gap-3 sm:gap-2 justify-center items-center">
                <button onClick={()=>cancelBooking(item._id)} className="px-4 cursor-pointer  py-1 border border-red-600 text-red-500 rounded-md hover:bg-red-200  transition duration-200">
                  Cancel
                </button>
                <button onClick={()=>completeBooking(item._id)} className=" cursor-pointer px-4 py-1 border border-green-500 text-green-500 rounded-md hover:bg-green-200  transition duration-200">
                  Complete
                </button>
              </div>

              }
              
            </div>
          )) 
        }
      </div>
    </div>
  )
}

export default ParkingBookings