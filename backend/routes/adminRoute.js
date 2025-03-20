import express from 'express';
import { addParking, allParking, loginAdmin } from '../controllers/adminController.js';
import { changeAvailability } from '../controllers/parkingController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';

const adminRouter = express.Router();

// Admin Login
adminRouter.post('/login', loginAdmin);

// Add Parking (Protected by authAdmin middleware)
adminRouter.post('/add-parking', authAdmin, upload.single('image'), addParking);

// Get All Parking (Protected by authAdmin middleware)
adminRouter.get('/all-parking', authAdmin, allParking);

// Change Parking Availability (Protected by authAdmin middleware)
adminRouter.post('/change-availability', authAdmin, changeAvailability);

export default adminRouter;