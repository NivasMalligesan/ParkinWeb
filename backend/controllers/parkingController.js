import parkingModel from "../models/parkingModel.js";

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

export { changeAvailability, ParkingList };
