import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Safe user data with fallbacks
  const safeUserData = {
    name: userData?.name || 'Not set',
    email: userData?.email || 'Not set',
    phone: userData?.phone || 'Not set',
    address: userData?.address || 'Not set',
    gender: userData?.gender || 'Not Selected',
    dob: userData?.dob || 'Not set',
    image: userData?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData?.name || 'User')}`
  };

  const updateUserProfileData = async () => {
    if (!userData) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('name', userData.name || '');
      formData.append('phone', userData.phone || '');
      formData.append('address', userData.address || '');
      formData.append('gender', userData.gender || 'Not Selected');
      formData.append('dob', userData.dob || '');
      
      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            'token': token,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      setImage(file);
    }
  };

  const getImagePreview = () => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return safeUserData.image;
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-gray-500">Please login to view profile</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="mt-4 bg-primary text-white px-6 py-2 rounded-full"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col md:flex-row gap-5 justify-between p-4 md:p-6'>
      <div className='w-full md:w-1/2 flex flex-col gap-4'>
        {/* Profile Image Section */}
        <div className="flex flex-col items-center">
          {isEdit ? (
            <label htmlFor='profile-image' className="cursor-pointer group">
              <div className="relative">
                <img 
                  className='w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg' 
                  src={getImagePreview()} 
                  alt="Profile" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium">Change Photo</span>
                </div>
              </div>
              <input 
                className='hidden' 
                onChange={handleImageChange} 
                type="file" 
                id='profile-image' 
                accept="image/*"
              />
            </label>
          ) : (
            <img 
              className='w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg' 
              src={safeUserData.image} 
              alt="Profile" 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(safeUserData.name)}`;
              }}
            />
          )}
          
          <h1 className='text-3xl font-bold text-gray-800 mt-4'>
            {isEdit ? (
              <input 
                className='text-center bg-transparent border-b-2 border-primary focus:outline-none'
                type="text" 
                value={userData.name || ''} 
                onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} 
              />
            ) : (
              safeUserData.name
            )}
          </h1>
        </div>

        <hr className='border-gray-300' />
        
        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className='text-xl font-semibold text-gray-700'>Contact Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1'>Email</label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className='text-gray-800'>{safeUserData.email}</p>
              </div>
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1'>Phone</label>
              {isEdit ? (
                <input 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  type="tel" 
                  value={userData.phone || ''} 
                  onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter phone number"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className='text-gray-800'>{safeUserData.phone}</p>
                </div>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className='block text-sm font-medium text-gray-600 mb-1'>Address</label>
              {isEdit ? (
                <textarea 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]'
                  value={userData.address || ''} 
                  onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter your address"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className='text-gray-800 whitespace-pre-line'>{safeUserData.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className='text-xl font-semibold text-gray-700'>Basic Information</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1'>Gender</label>
              {isEdit ? (
                <select 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  value={userData.gender || 'Not Selected'} 
                  onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="Not Selected">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className='text-gray-800'>{safeUserData.gender}</p>
                </div>
              )}
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-600 mb-1'>Date of Birth</label>
              {isEdit ? (
                <input 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
                  type="date" 
                  value={userData.dob || ''} 
                  onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className='text-gray-800'>{safeUserData.dob}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit/Save Buttons */}
        <div className='flex gap-3 pt-4'>
          {isEdit ? (
            <>
              <button 
                className='flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50'
                onClick={updateUserProfileData}
                disabled={isUploading}
              >
                {isUploading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                className='flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors'
                onClick={() => {
                  setIsEdit(false);
                  setImage(null);
                  loadUserProfileData(); // Reload original data
                }}
                disabled={isUploading}
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              className='flex-1 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors'
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;