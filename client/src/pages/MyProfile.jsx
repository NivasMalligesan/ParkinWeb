import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const {userData,setUserData,token,backendUrl , loadUserProfileData} = useContext(AppContext);
  const [image, setImage] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  // In MyProfile.js
const updateUserProfileData = async () => {
  if (!userData) return;

  try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', userData.address);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(
          `${backendUrl}/api/user/update-profile`,
          formData,
          {
             headers: {token}
          }
      );

      if (data.success) {
          toast.success("Profile updated successfully!");
          await loadUserProfileData();
          setIsEdit(false);
          setImage(null);
      }
  } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
  }
};
  


  return userData && (
    <div className='flex-row sm:flex gap-5 justify-between '>
    <div className='px-5 w-full sm:w-1/2 flex flex-col gap-2 text-sm'>

      {
        isEdit ?
        <label htmlFor='image'>
            <div className='flex gap-5'>
              <img className='w-36 h-36  rounded-lg object-cover' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              
              <img className='w-36 h-36 cursor-pointer' src={image ? assets.upload_area : assets.upload_area } alt="" />
            </div>
            <input className='cursor-pointer' onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden/>
        </label>:
      <img className='w-36 h-36 object-cover rounded-2xl' src={userData.image} alt="" />

      }
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
            <input className='bg-gray-100 w-full p-2 rounded-lg' 
              type="text" 
              value={userData.phone} 
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
          ) : (
            <p className='text-blue-500'>{userData.phone}</p>
          )}
          <p className='font-medium'>Address</p>
          {isEdit ? (
            <textarea className='bg-gray-100  w-full p-2 rounded-lg' 
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
            <select className='max-w-50 p-2 rounded-lg bg-gray-100' 
              onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))} 
              value={userData.gender}>
              <option  className='bg-gray-100' value="Male">Male</option>
              <option className='bg-gray-100' value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-400'>{userData.gender}</p>
          )}
          <p className='font-medium'>Birthday:</p>
          {isEdit ? (
            <input className='p-2 rounded-lg max-w-50 bg-gray-100' 
              type="date" 
              value={userData.dob} 
              onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
          ) : (
            <p className='text-gray-400'>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Vehicle Information */}
      

      {/* Edit / Save Button */}
      <div className='mt-4 flex space-x-2'>
                {isEdit ? (
                    <button 
                        className='border w-full mx-auto border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' 
                        onClick={updateUserProfileData}>
                        Save Information
                    </button>
                ) : (
                    <button 
                        className='border w-full mx-auto border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' 
                        onClick={() => setIsEdit(true)}>
                        Edit Information
                    </button>
                )}
            </div>
    </div>
    {/* <div className='w-full sm:w-1/2 items-start'>
        <p className='text-neutral-500 underline mt-3'>Vehicle Information</p>
        
      </div> */}
    </div>

  )
}

export default MyProfile
