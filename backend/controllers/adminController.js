import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import parkingModel from '../models/parkingModel.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import bookingModel from '../models/BookingModel.js';
import userModel from '../models/userModel.js';

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API FOR ADDING PARKING
const addParking = async (req, res) => {
    try {
        const { name, email, password, location, address, pricePerHour, totalCapacity, features, description, contact } = req.body;
        const imageFile = req.file;

        // Validate Required Fields
        if (!name || !email || !password || !location || !address || !pricePerHour || !totalCapacity || !contact || !description) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        // Validate Email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }

        // Validate Strong Password
        if (password.length < 8) {
            return res.status(400).json({ message: "Please enter a strong password" });
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload Image to Cloudinary
        let imageUrl = null;
        if (imageFile) {
            const result = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image"
            });
            imageUrl = result.secure_url;
        } else {
            return res.status(400).json({ message: "Image is required" });
        }

        // Parse Features Safely
        let parsedFeatures;
        try {
            parsedFeatures = JSON.parse(features);
        } catch (err) {
            return res.status(400).json({ message: "Invalid features format (must be JSON)" });
        }

        // Create Parking Entry
        const parkingData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            features: parsedFeatures,
            location,
            address,
            pricePerHour,
            totalCapacity,
            description,
            contact,
            available: true, // Default value
            date: Date.now(),
        };

        const newParking = await parkingModel.create(parkingData);
        await newParking.save();

        res.status(201).json({ success: true, message: "Parking added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// API FOR ADMIN LOGIN
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Sign token with an object payload
            const token = jwt.sign(
                { email, password },  // Payload should be an object
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Token expires in 1 hour
            );

            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid Admin Credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API TO GET ALL PARKING LIST FOR ADMIN PANEL
const allParking = async (req, res) => {
    try {
        const parking = await parkingModel.find({}).select('-password');
        res.json({ success: true, parking });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//get all apointement 
const bookingAdmin = async(req,res)=>{
    try {
        const bookings = await bookingModel.find({})
        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//api for booking cancellation
const bookingCancel = async (req, res) => {
    try {
      const {bookingId } = req.body;
  
      // Fetch the booking data
      const bookingData = await bookingModel.findById(bookingId);
      if (!bookingData) {
        return res.status(404).json({ success: false, message: "Booking not found" });
      }
  
      // Mark the booking as cancelled
      await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });
  
      // Release the parking slots
      const { parkId, slotDate, slotTime, duration } = bookingData;
  
      // Fetch the parking data
      const parkData = await parkingModel.findById(parkId);
      if (!parkData) {
        return res.status(404).json({ success: false, message: "Parking data not found" });
      }
  
      // Generate the booked slots based on the duration
      const generateBookedSlots = (startTime, duration) => {
        const bookedSlots = [];
        let [startHour, startMinute] = startTime.split(':').map(Number);
  
        for (let i = 0; i < duration; i++) {
          const hour = startHour + i;
          const time = `${String(hour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
          bookedSlots.push(time);
        }
  
        return bookedSlots;
      };
  
      const bookedSlots = generateBookedSlots(slotTime, duration);
  
      // Log the slots to be removed
      console.log("Slots to be removed:", bookedSlots);
  
      // Remove the booked slots from the parking data
      if (parkData.slots_booked && parkData.slots_booked[slotDate]) {
        console.log("Slots booked before removal:", parkData.slots_booked[slotDate]);
  
        // Filter out the booked slots
        parkData.slots_booked[slotDate] = parkData.slots_booked[slotDate].filter(
          slot => !bookedSlots.includes(slot)
        );
  
        console.log("Slots booked after removal:", parkData.slots_booked[slotDate]);
  
        // Save the updated parking data
        await parkData.save();
      }
  
      res.json({ success: true, message: 'Booking Cancelled' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };


  ///api to get dash data admin pannel
  const adminDashboard = async (req, res) => {
    try {
        const parking = await parkingModel.find({});
        const user = await userModel.find({});
        const booking = await bookingModel.find({});

        const dashData = {
            parkings: parking.length,
            bookings: booking.length, // Fixed typo
            users: user.length,
            latestBooking: booking.reverse().slice(0, 5), // Prevents modifying original array
        };

        res.json({ success: true, dashData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export { addParking,bookingAdmin,adminDashboard,bookingCancel, upload, loginAdmin, allParking };