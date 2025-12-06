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

// Middleware - FIXED CORS CONFIGURATION
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'https://parkinweb.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'aToken', 'x-access-token']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Handle preflight requests
app.options('*', cors());

// API Endpoints
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter); 
app.use('/api/parking', parkingRouter);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'PARKin Backend'
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: "PARKin API is working",
        version: "1.0.0",
        endpoints: {
            user: "/api/user",
            admin: "/api/admin", 
            parking: "/api/parking"
        }
    });
});

// Handle 404 routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'production' ? undefined : err.message
    });
});

// Server Listening
app.listen(port, () => {
    console.log(`✅ Server started on port ${port}`);
    console.log(`🌐 CORS enabled for: https://parkinweb.onrender.com`);
});