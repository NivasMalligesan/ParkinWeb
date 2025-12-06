import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const ParkingContext = createContext();

const ParkingContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [pToken, setPToken] = useState(localStorage.getItem('pToken') ? localStorage.getItem('pToken') : '');
    const [bookings, setBookings] = useState([]);
    const [dashData, setDashData] = useState({});
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Get bookings
    const getBookings = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/parking/bookings`, {
                headers: { Authorization: `Bearer ${pToken}` }
            });
            
            if (data.success) {
                setBookings(data.bookings);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast.error(error.response?.data?.message || "Failed to fetch bookings");
        }
    };

    // Complete booking
    const completeBooking = async(bookingId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/parking/complete-booking",
                { bookingId },
                { headers: { Authorization: `Bearer ${pToken}` } }
            );
             if(data.success){
                toast.success(data.message);
                getBookings();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to complete booking");
        }
    };

    // Cancel booking
    const cancelBooking = async(bookingId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/parking/cancel-booking",
                { bookingId },
                { headers: { Authorization: `Bearer ${pToken}` } }
            );
             if(data.success){
                toast.success(data.message);
                getBookings();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to cancel booking");
        }
    };

    // Get profile data - FIXED VERSION
    const getProfileData = async() => {
        if (!pToken) {
            toast.error("Authentication required");
            return;
        }
        
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/parking/profile`, {
                headers: { Authorization: `Bearer ${pToken}` }
            });
            
            if (data.success) {
                setProfileData(data.profileData);
            } else {
                toast.error(data.message);
                setProfileData(null);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error(error.response?.data?.message || "Failed to fetch profile data");
            setProfileData(null);
        } finally {
            setLoading(false);
        }
    };

    // Update profile - FIXED VERSION
    const updateProfileData = async (updateData) => {
        if (!pToken) {
            toast.error("Authentication required");
            return false;
        }
        
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${backendUrl}/api/parking/update-profile`,
                updateData,
                { headers: { Authorization: `Bearer ${pToken}` } }
            );
            
            if (data.success) {
                toast.success("Profile updated successfully!");
                // Refresh profile data
                await getProfileData();
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error(error.response?.data?.message || "Failed to update profile");
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Get dashboard data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/parking/dashboard`, {
                headers: { Authorization: `Bearer ${pToken}` }
            });
    
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch dashboard data");
        }
    };

    // Auto-fetch bookings when token changes
    useEffect(() => {
        if (pToken) {
            getBookings();
            getDashData();
        } else {
            setBookings([]);
            setDashData({});
            setProfileData(null);
        }
    }, [pToken]);
    
    const value = {
        pToken,
        setPToken,
        backendUrl,
        getBookings,
        bookings,
        setBookings,
        completeBooking,
        cancelBooking,
        dashData,
        setDashData,
        getDashData,
        getProfileData,
        updateProfileData,
        profileData,
        setProfileData,
        loading
    };

    return <ParkingContext.Provider value={value}>{children}</ParkingContext.Provider>;
};

export default ParkingContextProvider;