import express from 'express';
import {bookingCancel,parkingDashboard,BookingComplete,parkingProfile,updateParkingProfile, loginParking, ParkingList, bookingsParking } from '../controllers/parkingController.js';
import authParking from '../middleware/authParking.js';

const parkingRouter = express.Router();

parkingRouter.post('/login', loginParking);
parkingRouter.get('/parking-list', ParkingList);
parkingRouter.get('/bookings', authParking, bookingsParking);
parkingRouter.post('/complete-booking',authParking,BookingComplete)
parkingRouter.post('/cancel-booking',authParking,bookingCancel)
parkingRouter.get('/dashboard',authParking,parkingDashboard)
parkingRouter.get('/profile',authParking,parkingProfile)
parkingRouter.post('/update-profile',authParking,updateParkingProfile)
export default parkingRouter;