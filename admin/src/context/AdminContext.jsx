import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const backendUrl = import.meta.env.VITE_BACKENDURL;
    const [bookings,setBookings] = useState([])
    const [parking, setParking] = useState([]);
    const [dashData,setDashData] = useState(false)

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

    const getAllBooking = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/bookings',{headers:{aToken}})
            if(data.success){
                setBookings(data.bookings)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message);           
        }
    }
    
    const cancleBooking = async(bookingId) =>{
        try {
            const {data} = await axios.post(backendUrl+'/api/admin/cancel-booking',{bookingId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllBooking()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    const getDashData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{aToken}})
            if(data.success){
                setDashData(data.dashData)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }


    const value = {
        aToken,
        setAToken,
        backendUrl,
        getAllParking,
        parking,
        bookings,
        setBookings,
        changeAvailability,
        getAllBooking,
        cancleBooking,
        getDashData,
        dashData
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;