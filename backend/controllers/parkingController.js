import jwt from "jsonwebtoken";
import parkingModel from "../models/parkingModel.js";
import bcrypt from 'bcryptjs';
import bookingModel from "../models/BookingModel.js";

const changeAvailability = async (req, res) => {
    try {
        const { parkId } = req.body;
        const parkData = await parkingModel.findById(parkId);
        if (!parkData) {
            return res.status(404).json({ success: false, message: "Parking not found" });
        }
        await parkingModel.findByIdAndUpdate(parkId, { available: !parkData.available });
        res.json({ success: true, message: "Availability Changed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const ParkingList = async (req, res) => {
    try {
        const parking = await parkingModel.find({}).select(["-password", "-email"]);
        res.json({ success: true, parking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const bookingsParking = async (req, res) => {
    try {
        const { parkId } = req.body;
        if (!parkId) {
            return res.status(400).json({ success: false, message: "parkId is required" });
        }
        const bookings = await bookingModel.find({ parkId });
        if (!bookings) {
            return res.status(404).json({ success: false, message: "No bookings found" });
        }
        res.json({ success: true, bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const BookingComplete = async (req, res) => {
    try {
        const { parkId, bookingId } = req.body;
        const bookingData = await bookingModel.findById(bookingId);
        if (bookingData && bookingData.parkId === parkId) {
            await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true });
            return res.json({ success: true, message: "Booking Completed" });
        } else {
            return res.json({ success: false, message: "mark failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const bookingCancel = async (req, res) => {
    try {
        const { parkId, bookingId } = req.body;
        const bookingData = await bookingModel.findById(bookingId);
        if (bookingData && bookingData.parkId === parkId) {
            await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });
            return res.json({ success: true, message: "Booking Cancelled" });
        } else {
            return res.json({ success: false, message: "Cancellation failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const parkingDashboard = async (req, res) => {
    try {
        const { parkId } = req.body;
        const bookings = await bookingModel.find({ parkId });

        let earnings = bookings.reduce((sum, item) =>
            (item.isCompleted || item.Payment) ? sum + item.amount : sum, 0);

        let users = new Set(bookings.map(item => item.userId));

        const dashData = {
            earnings,
            bookings: bookings.length,
            users: users.size,
            latestBooking: [...bookings].reverse().slice(0, 5),
        };

        res.json({ success: true, dashData });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Remove console.log statements exposing sensitive data
const parkingProfile = async (req, res) => {
    try {
        const { parkId } = req.body;
        const profileData = await parkingModel.findById(parkId).select('-password -__v');
        if (profileData) {
            res.json({ success: true, profileData });
        } else {
            res.status(404).json({ success: false, message: "Profile not found" });
        }
    } catch (error) {
        console.error("Profile error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const updateParkingProfile = async (req, res) => {
    try {
        const { parkId, pricePerHour, address, available, features, description, location, contact } = req.body;
        const updateData = { 
            pricePerHour: Number(pricePerHour),
            address: address.trim(),
            available: Boolean(available),
            features: Array.isArray(features) ? features : [],
            description: description.trim(),
            location: location.trim(),
            contact: contact.trim(),
            updatedAt: Date.now()
        };
        
        // Validate required fields
        if (!updateData.location || !updateData.description || !updateData.contact) {
            return res.status(400).json({ success: false, message: "Required fields missing" });
        }
        
        const updatedProfile = await parkingModel.findByIdAndUpdate(
            parkId, 
            updateData, 
            { new: true, runValidators: true }
        ).select('-password -__v');
        
        if (!updatedProfile) {
            return res.status(404).json({ success: false, message: "Parking not found" });
        }
        
        res.json({ success: true, message: "Profile updated successfully", profileData: updatedProfile });
    } catch (error) {
        console.error("Update error:", error.message);
        res.status(500).json({ success: false, message: "Failed to update profile" });
    }
};

const loginParking = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }

        const parking = await parkingModel.findOne({ email });
        if (!parking) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, parking.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: parking._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ success: true, token, message: "Login successful" });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export {
    parkingDashboard,
    updateParkingProfile,
    parkingProfile,
    bookingCancel,
    BookingComplete,
    changeAvailability,
    loginParking,
    ParkingList,
    bookingsParking
};