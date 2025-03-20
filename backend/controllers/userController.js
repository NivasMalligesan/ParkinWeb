import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import parkingModel from '../models/parkingModel.js';
import bookingModel from '../models/bookingModel.js';

// API to Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation: Check missing details
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    // Validation: Check valid email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    // Validation: Strong password
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Enter a strong password (min 8 characters)" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating user data
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    // Save user to database
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({ success: true, token, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User Does Not Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to Get User Profile Data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API to Update User Profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file; // Extract image from FormData

    if (!userId || !name || !phone || !address || !dob || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Update user info
    const updateData = { name, phone, address, dob, gender };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
      updateData.image = imageUpload.secure_url;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "Profile Updated", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// API to Book Parking
const bookParking = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body

    // Validate required fields
    const { userId, parkId, slotTime, slotDate, duration } = req.body;
    if (!userId || !parkId || !slotTime || !slotDate || !duration) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Fetch parking data
    const parkData = await parkingModel.findById(parkId).select('-password');
    console.log("Parking Data:", parkData); // Log parking data
    if (!parkData) {
      return res.status(404).json({ success: false, message: "Parking data not found" });
    }

    // Check if parking is available
    if (!parkData.available) {
      return res.status(400).json({ success: false, message: "Parking is not available" });
    }

    // Fetch user data
    const userData = await userModel.findById(userId).select('-password');
    console.log("User Data:", userData); // Log user data
    if (!userData) {
      return res.status(404).json({ success: false, message: "User data not found" });
    }

    // Generate booked slots based on duration
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
    console.log("Booked Slots:", bookedSlots); // Log booked slots

    // Check if slots are already booked
    if (!parkData.slots_booked) {
      parkData.slots_booked = {};
    }
    if (!parkData.slots_booked[slotDate]) {
      parkData.slots_booked[slotDate] = [];
    }

    // Check if parking is exceeding total capacity
    const totalCapacity = parkData.totalCapacity ; // Default capacity if not provided
    const currentBookings = await bookingModel.find({ parkId, slotDate });

    let slotBookingCount = {}; // To track slot-wise bookings
    currentBookings.forEach((booking) => {
      const slots = generateBookedSlots(booking.slotTime, booking.duration);
      slots.forEach((slot) => {
        slotBookingCount[slot] = (slotBookingCount[slot] || 0) + 1;
      });
    });

    for (const slot of bookedSlots) {
      if (slotBookingCount[slot] >= totalCapacity) {
        return res.status(400).json({ success: false, message: `Slot ${slot} is fully booked` });
      }
    }

    // Create booking data
    const bookingData = {
      userId,
      parkId,
      userData,
      parkData,
      amount: parkData.pricePerHour * duration,
      slotTime,
      slotDate,
      duration,
      date: Date.now(),
    };
    console.log("Booking Data:", bookingData); // Log booking data

    // Save the booking
    const newBooking = new bookingModel(bookingData);
    await newBooking.save();
    console.log("Booking Saved Successfully"); // Log success

    // Update the parking data with the new slots_booked
    parkData.slots_booked[slotDate].push(...bookedSlots);
    await parkData.save();
    console.log("Parking Slots Updated Successfully"); // Log success

    res.status(201).json({ success: true, message: "Parking slot booked", booking: newBooking });
  } catch (error) {
    console.error("Error in bookParking:", error); // Log the full error
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};


//api to get parking booking to my booking page
const listBooking = async (req,res) =>{
  try {
    const {userId} = req.body;
    const bookings = await bookingModel.find({userId})
    res.json({success:true,bookings})

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message:error.message });
  
  }
} 

//api to cancel booking 
const cancelBooking = async (req, res) => {
  try {
    const { userId, bookingId } = req.body;

    // Fetch the booking data
    const bookingData = await bookingModel.findById(bookingId);
    if (!bookingData) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Verify user
    if (userId !== bookingData.userId.toString()) {
      return res.status(401).json({ success: false, message: "Unauthorized Action" });
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

    // Remove the booked slots from the parking data
    if (parkData.slots_booked && parkData.slots_booked[slotDate]) {
      parkData.slots_booked[slotDate] = parkData.slots_booked[slotDate].filter(
        slot => !bookedSlots.includes(slot)
      );

      // Save the updated parking data
      await parkData.save();
    }

    res.json({ success: true, message: 'Booking Cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getProfile, updateProfile,listBooking, bookParking ,cancelBooking};