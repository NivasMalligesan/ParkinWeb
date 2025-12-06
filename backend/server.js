import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import parkingRouter from './routes/parkingRoute.js';
import userRouter from './routes/userRoutes.js'; 

// App Config
const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

// Middleware - FIXED CORS
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-frontend-domain.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'aToken']
}));

// API Endpoints
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter); 
app.use('/api/parking', parkingRouter);

// Root route
app.get('/', (req, res) => {
    res.send("API working");
});

// Server Listening
app.listen(port, () => console.log(`Server started on port ${port}`));