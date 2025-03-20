import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;

        if (!atoken) {
            return res.status(401).json({ success: false, message: "Not Authenticated User" });
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        // Ensure token structure is correct
        if (!token_decode.email || !token_decode.password) {
            return res.status(401).json({ success: false, message: "Invalid token structure" });
        }

        if (token_decode.email !== process.env.ADMIN_EMAIL || token_decode.password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Not Authenticated User" });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default authAdmin;