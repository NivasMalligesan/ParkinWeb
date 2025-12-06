import jwt from 'jsonwebtoken';

const authParking = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ success: false, message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.parkId = decoded.id;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expired" });
        }
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default authParking;
