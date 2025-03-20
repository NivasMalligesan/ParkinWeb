import express from 'express';
import { ParkingList } from '../controllers/parkingController.js';

const parkingRouter = express.Router();

parkingRouter.get('/parking-list', ParkingList);

export default parkingRouter;
