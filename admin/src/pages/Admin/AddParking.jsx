import React, { useContext, useState } from "react";
import assets from "../../assets/assets";
import { features } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddParking = () => {
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [parkImg, setParkImg] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [totalCapacity, setTotalCapacity] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');
    const [location, setLocation] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const { aToken, backendUrl } = useContext(AdminContext);

    const handleFeatureToggle = (feature) => {
        setSelectedFeatures((prev) =>
            prev.includes(feature) ? prev.filter((item) => item !== feature) : [...prev, feature]
        );
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!parkImg) {
            return toast.error("Please upload an image.");
        }
    
        try {
            const formData = new FormData();
            formData.append("image", parkImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("totalCapacity", Number(totalCapacity));
            formData.append("pricePerHour", Number(pricePerHour));
            formData.append("location", location);
            formData.append("contact", contact);
            formData.append("address", address);
            formData.append("description", description);
            formData.append("features", JSON.stringify(selectedFeatures));
    
            console.log("Sending request:", formData);
    
            const { data } = await axios.post(
                `${backendUrl}/api/admin/add-parking`,
                formData,
                { headers: { aToken } }
            );
    
            console.log("Response received:", data);
    
            if (data.success) {
                toast.success(data.message);
                setParkImg(null);
                setName('');
                setEmail('');
                setPassword('');
                setTotalCapacity('');
                setPricePerHour('');
                setLocation('');
                setContact('');
                setAddress('');
                setDescription('');
                setSelectedFeatures([]);
            }
        } catch (error) {
            console.error("Error adding parking:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    };
    
    return (
        <form onSubmit={onSubmitHandler} className="p-6 w-full max-w-4xl mx-3 my-3 space-y-6 shadow-xl bg-white rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800">Add Parking</h2>

            {/* Image Upload Section */}
            <div className="flex flex-col items-start space-y-4">
                <label htmlFor="park-img" className="cursor-pointer">
                    <img
                        className="w-32 h-32 object-cover rounded-md border-2 border-dashed border-gray-300"
                        src={parkImg ? URL.createObjectURL(parkImg) : assets.upload_area}
                        alt="Upload"
                    />
                </label>
                <input
                    type="file"
                    onChange={(e) => setParkImg(e.target.files[0])}
                    id="park-img"
                    hidden
                />
                <p className="text-gray-600 text-sm">Upload Parking Picture</p>
            </div>

            {/* Form Fields Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Parking Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Name"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Parking Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Parking Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Number Of Slots</label>
                        <input
                            onChange={(e) => setTotalCapacity(e.target.value)}
                            value={totalCapacity}
                            type="number"
                            placeholder="500"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price Per Hour</label>
                        <input
                            onChange={(e) => setPricePerHour(e.target.value)}
                            value={pricePerHour}
                            type="number"
                            placeholder="50"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            type="text"
                            placeholder="Bangalore"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact</label>
                        <input
                            onChange={(e) => setContact(e.target.value)}
                            value={contact}
                            type="number"
                            placeholder="+91 9876543210"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            type="text"
                            placeholder="Street, City"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder="Describe your parking"
                            rows={5}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-700">Features</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                            {features.map((item, index) => (
                                <label key={index} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                                        checked={selectedFeatures.includes(item.feature)}
                                        onChange={() => handleFeatureToggle(item.feature)}
                                    />
                                    <span className="text-sm text-gray-700">{item.feature}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
                Add Parking
            </button>
        </form>
    );
};

export default AddParking;