import React, { useContext, useEffect, useState } from 'react';
import { ParkingContext } from '../../context/ParkingContext';
import { AppContext } from '../../context/AppContext';
import { features } from '../../assets/assets.js';
import { toast } from 'react-toastify';
import { Edit, Save, X, Check, MapPin, DollarSign, Phone, Mail, Clock, Car, Building, Shield, Wifi, Battery, Thermometer } from 'lucide-react';

const ParkingProfile = () => {
    const { pToken, profileData, getProfileData, updateProfileData, loading } = useContext(ParkingContext);
    const { currencySymbol } = useContext(AppContext);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({
        location: '',
        features: [],
        description: '',
        pricePerHour: '',
        address: '',
        available: true,
        contact: '',
    });

    // Initialize form data when profileData loads
    useEffect(() => {
        if (profileData) {
            setFormData({
                location: profileData.location || '',
                features: profileData.features || [],
                description: profileData.description || '',
                pricePerHour: profileData.pricePerHour || '',
                address: profileData.address || '',
                available: profileData.available !== false,
                contact: profileData.contact || '',
            });
        }
    }, [profileData]);

    useEffect(() => {
        if (pToken && !profileData) {
            getProfileData();
        }
    }, [pToken, profileData]);

    const handleFeatureToggle = (feature) => {
        setFormData(prev => {
            const updatedFeatures = prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature];
            return { ...prev, features: updatedFeatures };
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Remove empty strings and format data
        const submitData = {
            location: formData.location.trim(),
            features: formData.features.filter(f => f.trim() !== ''),
            description: formData.description.trim(),
            pricePerHour: Number(formData.pricePerHour),
            address: formData.address.trim(),
            available: formData.available,
            contact: formData.contact.trim(),
        };

        const success = await updateProfileData(submitData);
        if (success) {
            setIsEdit(false);
        }
    };

    const handleCancel = () => {
        if (profileData) {
            setFormData({
                location: profileData.location || '',
                features: profileData.features || [],
                description: profileData.description || '',
                pricePerHour: profileData.pricePerHour || '',
                address: profileData.address || '',
                available: profileData.available !== false,
                contact: profileData.contact || '',
            });
        }
        setIsEdit(false);
    };

    // Render loading state
    if (loading && !profileData) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading profile...</p>
                </div>
            </div>
        );
    }

    // Render error/empty state
    if (!profileData && !loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Building className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No Profile Data</h2>
                    <p className="text-gray-500 mb-6">Unable to load parking profile data</p>
                    <button
                        onClick={getProfileData}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Retry Loading
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Parking Profile
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your parking lot information and settings
                    </p>
                </div>
                
                {!isEdit ? (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors shadow-sm"
                    >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Overview */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Parking Image & Basic Info */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-shrink-0">
                                <img
                                    src={profileData.image}
                                    alt={profileData.name}
                                    className="w-full md:w-64 h-48 object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                                        <div className="flex items-center gap-2 mt-2">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {isEdit ? (
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    className="px-3 py-1.5 border border-gray-300 rounded-lg w-full"
                                                    placeholder="Enter location"
                                                />
                                            ) : (
                                                <span className="text-gray-600">{profileData.location}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${profileData.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {profileData.available ? 'Available' : 'Unavailable'}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-blue-600 font-medium">Total Capacity</p>
                                        <p className="text-2xl font-bold text-blue-900">{profileData.totalCapacity}</p>
                                        <p className="text-xs text-blue-700">parking slots</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-green-600 font-medium">Hourly Rate</p>
                                        <div className="flex items-baseline">
                                            <span className="text-2xl font-bold text-green-900">{currencySymbol}</span>
                                            {isEdit ? (
                                                <input
                                                    type="number"
                                                    name="pricePerHour"
                                                    value={formData.pricePerHour}
                                                    onChange={handleInputChange}
                                                    className="text-2xl font-bold text-green-900 bg-transparent border-b border-green-300 w-20"
                                                    min="0"
                                                />
                                            ) : (
                                                <span className="text-2xl font-bold text-green-900">{profileData.pricePerHour}</span>
                                            )}
                                            <span className="text-sm text-green-700 ml-1">/hour</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                        {isEdit ? (
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Describe your parking facility..."
                            />
                        ) : (
                            <p className="text-gray-600 leading-relaxed">
                                {profileData.description}
                            </p>
                        )}
                    </div>

                    {/* Features */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Features & Amenities</h3>
                        {isEdit ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {features.map((item, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={formData.features.includes(item.feature)}
                                            onChange={() => handleFeatureToggle(item.feature)}
                                            className="rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <span className="text-gray-700">{item.feature}</span>
                                    </label>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {profileData.features?.map((feature, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Details & Settings */}
                <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-gray-900 font-medium">{profileData.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">Contact Number</p>
                                    {isEdit ? (
                                        <input
                                            type="text"
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg"
                                            placeholder="Enter contact number"
                                        />
                                    ) : (
                                        <p className="text-gray-900 font-medium">{profileData.contact}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                        {isEdit ? (
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter complete address..."
                            />
                        ) : (
                            <div className="flex gap-3">
                                <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                                <p className="text-gray-600">{profileData.address}</p>
                            </div>
                        )}
                    </div>

                    {/* Availability Settings */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
                                <p className="text-sm text-gray-500 mt-1">Set parking availability status</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="available"
                                    checked={formData.available}
                                    onChange={handleInputChange}
                                    className="sr-only peer"
                                    disabled={!isEdit}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    </div>

                    {/* Status Card */}
                    <div className="bg-gradient-to-br from-primary to-blue-800 rounded-xl p-6 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-6 h-6" />
                            <h3 className="text-lg font-semibold">Profile Status</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm opacity-90">Last Updated</span>
                                <span className="font-medium">
                                    {profileData.updatedAt ? new Date(profileData.updatedAt).toLocaleDateString() : 'Never'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm opacity-90">Verified</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${profileData.verified ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                    {profileData.verified ? 'Yes' : 'Pending'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParkingProfile;