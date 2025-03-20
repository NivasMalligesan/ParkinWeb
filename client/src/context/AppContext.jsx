import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const storedToken = localStorage.getItem("token");
    const [parking, setParking] = useState([]);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [userData, setUserData] = useState(null);

    const getParkingData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/parking/parking-list`);
            if (data.success) {
                setParking(data.parking);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { token },
            });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getParkingData();
    }, [backendUrl]);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null);
        }
    }, [token]);

    const value = {
        parking,
        currencySymbol,
        getParkingData,
        token,
        setToken,
        backendUrl,
        userData,
        loadUserProfileData,
        setUserData
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
