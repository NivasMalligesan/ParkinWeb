import React, { useContext, useEffect } from 'react'
import { ParkingContext } from '../../context/ParkingContext'
import { AppContext } from '../../context/AppContext'

const ParkingDashboard = () => {
  const { pToken, dashData, setDashData, getDashData ,cancelBooking} = useContext(ParkingContext)
  const {currencySymbol,slotDateFormate } = useContext(AppContext)
  useEffect(() => {
    if (pToken) {
      getDashData()
    }
  }, [pToken])
  return dashData && (
    <div className='m-5 w-3/4'>
      <div className='flex gap-5 '>

        <div className='w-full'>
          <div className='flex gap-3 sm:w-full'>
            <div className='w-full flex items-center gap-2 bg-white p-4 min-2-52 rounded border-2 border-gray-100 cursor-pointer hover:shadow hover:scale-105 transition-all duration-500'>
              <p className='w-14 text-5xl px-3 py-3 text-center bg-primary rounded-xl font-bold text-white'>{currencySymbol}</p>
              <div className='ml-2'>
                <p className='text-xl font-semibold text-gray-600'>{currencySymbol} {dashData.earnings}</p>
                <p className='text-xs text-gray-400 '>Earnings</p>
              </div>
            </div>
            <div className='w-full flex items-center gap-2 bg-white p-4 min-2-52 rounded border-2 border-gray-100 cursor-pointer hover:shadow hover:scale-105 transition-all duration-500'>
              <p className='w-14 text-5xl px-3 text-center py-3 bg-primary rounded-xl font-bold text-white'>P</p>
              <div className='ml-2'>
                <p className='text-xl font-semibold text-gray-600'>{dashData.bookings}</p>
                <p className='text-xs text-gray-400 '>Slot Bookings</p>
              </div>
            </div>
            <div className='w-full flex items-center gap-2 bg-white p-4 min-2-52 rounded border-2 border-gray-100 cursor-pointer hover:shadow hover:scale-105 transition-all duration-500'>
              <p className='w-14 text-5xl px-3 text-center py-3 bg-primary rounded-xl font-bold text-white'>P</p>
              <div className='ml-2'>
                <p className='text-xl font-semibold text-gray-600'>{dashData.users}</p>
                <p className='text-xs text-gray-400 '>Total Users</p>
              </div>
            </div>

          </div>

          <div className='bg-white  '>
            <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-300 '>
              
              <p className='font-semibold'>Latest Bookings</p>
            </div>
            <div className='pt-4 border border-gray-300 border-t-0'>
              {
                dashData.latestBooking?.length > 0 ? (
                  dashData.latestBooking.map((item, index) => (
                    <div className='flex justify-between items-center gap-4 px-4 py-2 border-b border-gray-300' key={index}>
                      <div className='flex gap-4'>
                        <img src={item.userData.image} alt="" className="w-14 h-14  rounded object-cover" />
                        <div>
                          <p className="font-medium text-gray-800">{item.userData.name}</p>
                          <p className="text-gray-600">{slotDateFormate(item.slotDate)}</p>
                        </div>
                      </div>

                      <div>
                        {item.cancelled ? (
                          <p className='text-red-600 text-center rounded-full'>Cancelled</p>
                        ) : (
                          <div className='flex items-center justify-center gap-2'>
                            <p className='text-green-600 border flex justify-center py-1 px-2 rounded-full border-green-600 bg-green-100'>Booked</p>
                            <p onClick={() => cancelBooking(item._id)} className='text-red-600 border py-1 px-2 rounded-full cursor-pointer border-red-600 bg-red-100'>Cancel Booking</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No recent bookings</p>
                )
              }
            </div>
          </div>
        </div>
        <div>
        </div>
        
      </div>
    </div>
  )
}

export default ParkingDashboard