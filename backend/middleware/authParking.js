import jwt from 'jsonwebtoken';

const authParking = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Extract token from Authorization header
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authenticated User" });
        }

        const token = authHeader.split(" ")[1]; // Extract actual token from "Bearer <token>"
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.parkId = decoded.id;

        console.log("Authentication success");
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

export default authParking;
