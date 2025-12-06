import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        // Get token from headers
        const token = req.headers.token || req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required. Please login."
            });
        }

        // Remove 'Bearer ' if present
        const cleanToken = token.startsWith('Bearer ') ? token.slice(7) : token;
        
        // Verify token
        const token_decode = jwt.verify(cleanToken, process.env.JWT_SECRET);
        
        // Add user ID to request
        req.body.userId = token_decode.id;
        req.userId = token_decode.id;

        console.log("User authenticated:", token_decode.id);
        next();
        
    } catch (error) {
        console.error("Auth error:", error.message);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token. Please login again."
            });
        }

        return res.status(500).json({
            success: false,
            message: "Authentication error"
        });
    }
};

export default authUser;