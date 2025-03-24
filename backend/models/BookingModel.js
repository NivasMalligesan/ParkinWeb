import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    parkId: { type: String, required: true },
    slotTime: { type: String, required: true },
    duration: { type: String, required: true },
    userData: { type: Object, required: true },
    parkData: { type: Object, required: true },
    amount: { type: Number, required: true },
    slotDate: { type: String, required: true },
    slotsBooked: [{ type: String }],
    cancelled: { type: Boolean, default: false },
    Payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

const bookingModel = mongoose.models.booking || mongoose.model('booking', bookingSchema);
export default bookingModel;