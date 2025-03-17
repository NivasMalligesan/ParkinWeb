import React, { useState } from 'react'
import assets from '../assets/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Nivas Malligesan",
    image: assets.Profile,
    email: "nivasmalligesan@gmail.com",
    phone: "1234567890",
    address: "Koramangala, Bangalore, India",
    gender: 'Male',
    dob: '2005-11-23',
    vehicleType: 'Car',
    vehicleModel: 'BMW M5 Competition',
    vehicleNo: 'TN70-MR1100',
    vehicleColor: 'Black',
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 h-36 object-cover rounded-2xl' src={userData.image} alt="" />
      {isEdit ? (
        <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' 
          type="text" 
          value={userData.name} 
          onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
      ) : (
        <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      )}
      <hr className='bg-zinc-400 h-[1px] border-none' />
      
    
      {/* Contact Information */}
      <div>
        <p className='text-neutral-500 underline mt-3'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium '>Phone:</p>
          {isEdit ? (
            <input className='bg-gray-100 max-w-52' 
              type="text" 
              value={userData.phone} 
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
          ) : (
            <p className='text-blue-500'>{userData.phone}</p>
          )}
          <p className='font-medium'>Address</p>
          {isEdit ? (
            <input className='bg-gray-50 max-w-52' 
              type="text" 
              value={userData.address} 
              onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))} />
          ) : (
            <p className='text-gray-600'>{userData.address}</p>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div>
        <p className='text-neutral-500 underline mt-3'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select className='max-w-20 bg-gray-100' 
              onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
              value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-400'>{userData.gender}</p>
          )}
          <p className='font-medium'>Birthday:</p>
          {isEdit ? (
            <input className='max-w-28 bg-gray-100' 
              type="date" 
              value={userData.dob} 
              onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
          ) : (
            <p className='text-gray-400'>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Vehicle Information */}
      <div>
        <p className='text-neutral-500 underline mt-3'>Vehicle Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-2.5 mt-3 text-neutral-700'>
          <p className='font-medium '>Vehicle Type:</p>
          {isEdit ? (
            <select className='max-w-20 bg-gray-100' 
              onChange={e => setUserData(prev => ({ ...prev, vehicleType: e.target.value }))} 
              value={userData.vehicleType}>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
            </select>
          ) : (
            <p className='text-gray-400'>{userData.vehicleType}</p>
          )}
          <p className='font-medium'>Vehicle Model:</p>
          {isEdit ? (
            <input className='max-w-28 bg-gray-100' 
              type="text" 
              value={userData.vehicleModel} 
              onChange={e => setUserData(prev => ({ ...prev, vehicleModel: e.target.value }))} />
          ) : (
            <p className='text-gray-400'>{userData.vehicleModel}</p>
          )}
          <p className='font-medium'>Vehicle No:</p>
          {isEdit ? (
            <input className='max-w-28 bg-gray-100' 
              type="text" 
              value={userData.vehicleNo} 
              onChange={e => setUserData(prev => ({ ...prev, vehicleNo: e.target.value }))} />
          ) : (
            <p className='text-gray-400'>{userData.vehicleNo}</p>
          )}
          <p className='font-medium'>Vehicle Color:</p>
          {isEdit ? (
            <input className='max-w-28 bg-gray-100' 
              type="text" 
              value={userData.vehicleColor} 
              onChange={e => setUserData(prev => ({ ...prev, vehicleColor: e.target.value }))} />
          ) : (
            <p className='text-gray-400'>{userData.vehicleColor}</p>
          )}
        </div>
      </div>

      {/* Edit / Save Button */}
      <div className='mt-10'>
        {isEdit ? (
          <button className='border border-primary px-8 py-2 rounded-full hover:bg-[#] hover:text-white transition-all' 
            onClick={() => setIsEdit(false)}>
            Save Information
          </button>
        ) : (
          <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' 
            onClick={() => setIsEdit(true)}>
            Edit Information
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
