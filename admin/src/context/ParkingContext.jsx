import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const ParkingContext = createContext();

const ParkingContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const [pToken, setPToken] = useState(localStorage.getItem('pToken')?localStorage.getItem('pToken') : '');
    const [bookings, setBookings] = useState([]);
    const [dashData,setDashData] = useState([]);
    const [profileData,setProfileData] = useState(false)


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
            console.error(error);
            toast.error(error);
        }
    };

    const completeBooking = async(bookingId)=>{
        try {
            const { data } = await axios.post(
                backendUrl + "/api/parking/complete-booking",
                { bookingId },
                { headers: { Authorization: `Bearer ${pToken}` } }
            );
             if(data.success){
                toast.success(data.message)
                getBookings()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error);
       
        }
    }

    const cancelBooking = async(bookingId)=>{
        try {
            const { data } = await axios.post(
                backendUrl + "/api/parking/cancel-booking",
                { bookingId },
                { headers: { Authorization: `Bearer ${pToken}` } }
            );
             if(data.success){
                toast.success(data.message)
                getBookings()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error);
       
        }
    }

    const getProfileData = async()=>{
        try {
            const { data } = await axios.get(backendUrl+'/api/parking/profile',
                { headers: { Authorization: `Bearer ${pToken}` } 
            }
        )
        if(data.success){
            setProfileData(data.profileData);
        }else{
            console.lof(data.message)
            toast.error(data.message)
        }
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/parking/dashboard`, {
                headers: { Authorization: `Bearer ${pToken}` }
            });
    
            if (data.success) {
                setDashData(data.dashData);
                console.log("Updated Dashboard Data:", data.dashData); // Logs new data correctly
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch dashboard data");
        }
    };
    




    useEffect(() => {
        if (pToken) {
            getBookings();
        } else {
            setBookings([]); 
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
        profileData,
        setProfileData
    };

    return <ParkingContext.Provider value={value}>{children}</ParkingContext.Provider>;
};

export default ParkingContextProvider;