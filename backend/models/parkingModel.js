import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    totalCapacity: { type: Number, required: true },
    rating: { type: Number, default: 0 }, // Default rating
    features: { type: [String], required: true },
    description: { type: String, required: true },
    contact: { type: String, required: true },
    available: { type: Boolean, default: true },
    date: { type: Date, default: Date.now },
    slots_booked: { type: Object, default: {} },
    verified: { type: Boolean, default: false }
}, { minimize: false });

const parkingModel = mongoose.models.parking || mongoose.model("parking", parkingSchema);

export default parkingModel;