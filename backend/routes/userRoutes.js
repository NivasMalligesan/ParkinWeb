import express from 'express';
import {verifyRazorpay,paymentRazorpay,cancelBooking, bookParking, getProfile, listBooking, loginUser, registerUser, updateProfile } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-parking', bookParking);
userRouter.get('/booking',authUser, listBooking);
userRouter.post('/cancel-booking',authUser, cancelBooking);
userRouter.post('/payment-razorpay',authUser,paymentRazorpay);
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay);
export default userRouter;