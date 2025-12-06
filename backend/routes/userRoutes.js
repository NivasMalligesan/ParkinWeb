import express from 'express';
import { verifyRazorpay, paymentRazorpay, cancelBooking, bookParking, getProfile, listBooking, loginUser, registerUser, updateProfile } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

// PUBLIC ROUTES (no authentication needed)
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// PROTECTED ROUTES (require authentication)
userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', authUser, upload.single('image'), updateProfile);
userRouter.post('/book-parking', authUser, bookParking);
userRouter.get('/booking', authUser, listBooking);
userRouter.post('/cancel-booking', authUser, cancelBooking);
userRouter.post('/payment-razorpay', authUser, paymentRazorpay);
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay);

export default userRouter;