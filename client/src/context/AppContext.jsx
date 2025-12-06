// src/context/AppContext.jsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "₹";
    // Use VITE_BACKEND_URL from environment
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://parkinserver.onrender.com";

    const storedToken = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    const [parking, setParking] = useState([]);
    const [token, setToken] = useState(storedToken || null);
    const [userData, setUserData] = useState(storedUserData ? JSON.parse(storedUserData) : null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("Backend URL:", backendUrl); // Debug log

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
            console.error("Error fetching parking data:", error);
            setError(error.message);
            toast.error("Failed to load parking data. Please check backend connection.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch User Profile
    const loadUserProfileData = async () => {
        if (!token) {
            setUserData(null);
            return;
        }
        
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { token },
            });

            if (data.success) {
                setUserData(data.userData);
                localStorage.setItem('userData', JSON.stringify(data.userData));
            } else {
                toast.error(data.message || "Failed to load profile");
            }
        } catch (error) {
            console.error("Error loading profile:", error);
            // Don't show error toast for profile load failures
        }
    };

    // Load Parking Data Once
    useEffect(() => {
        console.log("Loading parking data from:", backendUrl);
        getParkingData();
    }, []);

    // Load Profile When Token Exists or Changes
    useEffect(() => {
        loadUserProfileData();
    }, [token]);

    // Context Value
    const value = {
        parking,
        currencySymbol,
        backendUrl,
        getParkingData,

        token,
        setToken: (newToken) => {
            setToken(newToken);
            if (!newToken) {
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                setUserData(null);
            } else {
                localStorage.setItem('token', newToken);
            }
        },

        userData,
        setUserData: (data) => {
            setUserData(data);
            if (data) {
                localStorage.setItem('userData', JSON.stringify(data));
            } else {
                localStorage.removeItem('userData');
            }
        },
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