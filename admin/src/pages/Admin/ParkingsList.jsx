import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext.jsx';

const ParkingsList = () => {
    const { parking, aToken, getAllParking, changeAvailability } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllParking();
        }
    }, [aToken]);

    return (
        <div className=" ml-18 md:ml-28 lg:ml-65 py-5">
            <h1 className="pl-10 pb-5 text-lg font-medium">All Parkings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10 gap-4 gap-y-6">
                {parking.map((item, index) => (
                    <div
                        key={index}
                        className="cursor-pointer w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                    >
                        <div className="relative">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-52 object-cover"
                            />
                            <span
                                className={`flex items-center gap-2 absolute top-3 right-3 bg-white ${
                                    item.available ? 'text-green-500' : 'text-red-500'
                                } px-3 py-1 rounded-full text-sm font-medium`}
                            >
                                <p
                                    className={`w-2 h-2 ${
                                        item.available ? 'bg-green-500' : 'bg-red-500'
                                    } rounded-full`}
                                ></p>
                                <p>{item.available ? 'Available' : 'Unavailable'}</p>
                            </span>
                        </div>

                        <div className="p-5 space-y-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500 mt-1">{item.location}</p>
                                <div className="mt-2 flex items-center gap-1 text-sm">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 cursor-pointer"
                                        checked={item.available}
                                        onChange={() => changeAvailability(item._id)}
                                    />
                                    <p>Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParkingsList;