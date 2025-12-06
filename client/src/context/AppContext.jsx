import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const storedToken = localStorage.getItem("token");

    const [parking, setParking] = useState([]);
    const [token, setToken] = useState(storedToken || null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Parking List
    const getParkingData = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/parking/parking-list`);
            
            if (data.success) {
                setParking(data.parking);
                setError(null);
            } else {
                setError(data.message);
                toast.error(data.message || "Failed to load parking data");
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch User Profile
    const loadUserProfileData = async () => {
        if (!token) return;
        
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { token },
            });

            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message || "Failed to load profile");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Load Parking Data Once
    useEffect(() => {
        if (!backendUrl) {
            console.error("❌ VITE_BACKEND_URL is missing.");
            setError("Backend URL not found");
            setLoading(false);
            return;
        }

        getParkingData();
    }, [backendUrl]);

    // Load Profile When Token Exists
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null);
        }
    }, [token]);

    // Context Value
    const value = {
        parking,
        currencySymbol,
        backendUrl,
        getParkingData,

        token,
        setToken,

        userData,
        setUserData,
        loadUserProfileData,

        loading,
        error
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;