import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const [parking, setParking] = useState([]);

    const getAllParking = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/all-parking`, {
                headers: { aToken } // Correctly pass the token in headers
            });
            if (data.success) {
                setParking(data.parking);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const changeAvailability = async (parkId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/change-availability`,
                { parkId },
                { headers: { aToken } } // Correctly pass the token in headers
            );
            if (data.success) {
                toast.success(data.message);
                getAllParking();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const value = {
        aToken,
        setAToken,
        backendUrl,
        getAllParking,
        parking,
        changeAvailability
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;