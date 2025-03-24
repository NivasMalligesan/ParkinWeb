import React, { useContext, useEffect, useState } from 'react';
import { ParkingContext } from '../../context/ParkingContext';
import { AppContext } from '../../context/AppContext';
import { features } from '../../assets/assets.js';
import { toast } from 'react-toastify';
import axios from 'axios';
const ParkingProfile = () => {
  const { pToken, profileData, setProfileData, getProfileData } = useContext(ParkingContext);
  const { currencySymbol,backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [localProfileData, setLocalProfileData] = useState(profileData || {});

  const updateProfile = async ()=>{
    try {
      const updateData = {
        location : localProfileData.location,
        features : localProfileData.features,
        description : localProfileData.description,
        pricePerHour : localProfileData.pricePerHour,
        address : localProfileData.address,
        available :localProfileData.available,
        }

        const {data} = await axios.post(backendUrl + '/api/parking/update-profile', updateData, {headers : {Authorization: `Bearer ${pToken}`}});
        if(data.success){
          toast.success(data.message)
          setIsEdit(false)
          getProfileData()
        }else{
          toast.error(data.message)
        }
      
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  useEffect(() => {
    if (profileData) {
      setLocalProfileData(profileData);
    }
  }, [profileData]);

  console.log(localProfileData)

  useEffect(() => {
    if (pToken) getProfileData();
  }, [pToken]); 


  const handleFeatureToggle = (feature) => {
    setLocalProfileData((prev) => {
      const updatedFeatures = new Set(prev.features || []);
      updatedFeatures.has(feature) ? updatedFeatures.delete(feature) : updatedFeatures.add(feature);
      return { ...prev, features: Array.from(updatedFeatures) };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfileData(localProfileData);
    setIsEdit(false);
    // You might want to add an API call here to save the data to your backend
  };

  return localProfileData && (
    <div className="flex flex-col gap-4 sm:m-5">
      {/* Image */}
      <div>
        <img className="w-full sm:max-w-64 sm:max-h-64 rounded-lg object-cover" src={localProfileData.image} alt="Parking" />
      </div>

      <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
        {/* Parking Info */}
        <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{localProfileData.name}</p>
        <div className="flex items-center gap-3">
          {isEdit ? (
            <div className='flex gap-2 items-center'>
              <p className='text-gray-600'>Location:</p>
              <input 
                type="text"
                name="location"
                value={localProfileData.location || ''} 
                onChange={handleInputChange}
                className='bg-gray-100 p-2 rounded-lg' 
              />
            </div>
          ) : (
            <p className="text-gray-600">Location: {localProfileData.location}</p>
          )}
          <p className="py-0.5 px-2 border text-xs rounded-full">{localProfileData.totalCapacity} Slots</p>
        </div>

        {/* Features */}
        {isEdit ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
            {features.map((item, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600 rounded"
                  checked={localProfileData.features?.includes(item.feature)}
                  onChange={() => handleFeatureToggle(item.feature)}
                />
                <span className="text-sm text-gray-700">{item.feature}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mt-5">
            {localProfileData.features?.map((item, index) => (
              <p key={index} className="whitespace-nowrap text-xs text-white bg-primary px-3 py-0.5 rounded-full">
                {item}
              </p>
            ))}
          </div>
        )}

        {/* About Section */}
        <div className="mt-5">
          <p className="text-sm font-medium text-neutral-800">About:</p>
          {isEdit ? (
            <textarea
              className="text-sm bg-gray-100 w-full p-2 text-gray-600 max-w-[700px] mt-1"
              name="description"
              value={localProfileData.description || ''}
              onChange={handleInputChange}
            />
          ) : (
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">{localProfileData.description}</p>
          )}
        </div>

        {/* Cost Per Hour */}
        <p className="text-gray-600 font-medium mt-4">
          Cost Per Hour: <span className="text-gray-800">{currencySymbol}</span>
          {isEdit ? (
            <input
              className="py-0.5 px-2 w-full mt-6 sm:mt-0 bg-gray-100 rounded-md"
              type="number"
              name="pricePerHour"
              onChange={handleInputChange}
              value={localProfileData.pricePerHour || ''}
              placeholder="50"
            />
          ) : (
            localProfileData.pricePerHour
          )}
        </p>

        {/* Address */}
        {isEdit ? (
          <div className="flex items-center gap-2 mt-4">
            <p>Address:</p>
            <textarea
              name="address"
              onChange={handleInputChange}
              value={localProfileData.address || ''}
              className="text-sm bg-gray-100 rounded-md w-full p-2"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-4">
            <p>Address:</p>
            <p className="text-sm">{localProfileData.address}</p>
          </div>
        )}

        {/* Availability Toggle */}
        <div className="flex gap-1 pt-2">
          <input
            className="w-4"
            checked={localProfileData.available || false}
            type="checkbox"
            onChange={(e) => setLocalProfileData(prev => ({ ...prev, available: e.target.checked }))}
          />
          <label>Available</label>
        </div>

        {/* Edit Button */}

        {
          !isEdit ?
        <button
          onClick={() => setIsEdit(true)}
          className="px-4 py-1 border border-gray-800 text-sm rounded-full mt-5 w-full hover:bg-[#14213d] hover:text-white transition-all"
        >
          Edit
        </button>
  :
        <button
          onClick={() => updateProfile(localProfileData)}
          className="px-4 py-1 border border-gray-800 text-sm rounded-full mt-5 w-full hover:bg-[#14213d] hover:text-white transition-all"
        >
          Save
        </button>
        }
      </div>
    </div>
  );
};

export default ParkingProfile;