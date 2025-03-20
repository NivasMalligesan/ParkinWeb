import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import parkingRouter from './routes/parkingRoute.js';
import userRouter from './routes/userRoutes.js';  // Ensure file name matches

// App Config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/admin', adminRouter);
app.use('/api/parking', parkingRouter);
app.use('/api/user', userRouter); // Fixed missing forward slash

// Root route
app.get('/', (req, res) => {
    res.send("API working");
});

// Server Listening
app.listen(port, () => console.log(`Server started on port ${port}`));
