import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
    
    vehicleType: { type: String, default: "Not Selected" },
    vehicleModel: { type: String, default: "" },
    vehicleNo: { type: String, default: "000000000" },
    vehicleColor: { type: String, default: "Not Selected" },
});

const VehicleModel = mongoose.models.vehicle || mongoose.model("vehicle", VehicleSchema);

export default VehicleModel;
