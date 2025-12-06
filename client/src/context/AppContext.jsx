import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencySymbol = "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://parkinserver.onrender.com";

    const storedToken = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    const [parking, setParking] = useState([]);
    const [token, setToken] = useState(storedToken || null);
    const [userData, setUserData] = useState(storedUserData ? JSON.parse(storedUserData) : null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    console.log("Backend URL:", backendUrl);

    // Helper function to sanitize image URLs
    const sanitizeImageUrl = (url, fallbackType = 'parking') => {
        console.log("Sanitizing URL:", url, "type:", fallbackType);
        
        // If URL is undefined, null, or literally the string "undefined"
        if (!url || url === 'undefined' || url === 'null' || url.includes('undefined')) {
            console.log("URL is invalid, using fallback");
            return getFallbackImage(fallbackType);
        }
        
        // If it's already a full URL, return as is
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        
        // If it starts with // (protocol-relative URL), add https:
        if (url.startsWith('//')) {
            return `https:${url}`;
        }
        
        // If it's a relative path starting with /, prepend backend URL
        if (url.startsWith('/')) {
            return `${backendUrl}${url}`;
        }
        
        // If it's just a filename or path, assume it's relative to backend
        return `${backendUrl}/${url}`;
    };

    // Get appropriate fallback image
    const getFallbackImage = (type = 'parking') => {
        const fallbacks = {
            user: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
            parking: `https://api.dicebear.com/7.x/shapes/svg?seed=parking${Date.now()}&backgroundColor=3B82F6`,
            default: `https://api.dicebear.com/7.x/shapes/svg?seed=default${Date.now()}`
        };
        return fallbacks[type] || fallbacks.default;
    };

    // Sanitize parking data
    const sanitizeParkingData = (parkingArray) => {
        if (!Array.isArray(parkingArray)) return [];
        
        return parkingArray.map(park => {
            // Create a safe copy with defaults
            const safePark = {
                _id: park._id || `temp-${Date.now()}-${Math.random()}`,
                name: park.name || "Unnamed Parking",
                location: park.location || "Location not specified",
                pricePerHour: typeof park.pricePerHour === 'number' ? park.pricePerHour : 0,
                totalCapacity: typeof park.totalCapacity === 'number' ? park.totalCapacity : 0,
                rating: typeof park.rating === 'number' ? park.rating : 4.2,
                available: park.available !== undefined ? park.available : true,
                features: Array.isArray(park.features) ? park.features : [],
                description: park.description || "",
                address: park.address || "",
                contact: park.contact || "",
                // Sanitize image URL
                image: sanitizeImageUrl(park.image, 'parking')
            };
            
            console.log("Sanitized parking:", safePark.name, "Image:", safePark.image);
            return safePark;
        });
    };

    // Sanitize user data
    const sanitizeUserData = (user) => {
        if (!user) return null;
        
        const safeUser = {
            ...user,
            name: user.name || "User",
            email: user.email || "",
            phone: user.phone || "",
            address: user.address || "",
            gender: user.gender || "Not Selected",
            dob: user.dob || "",
            // Sanitize image URL
            image: sanitizeImageUrl(user.image, 'user')
        };
        
        console.log("Sanitized user:", safeUser.name, "Image:", safeUser.image);
        return safeUser;
    };

    // Fetch Parking List
    const getParkingData = async () => {
        try {
            setLoading(true);
            console.log("Fetching parking data from:", `${backendUrl}/api/parking/parking-list`);
            
            const response = await axios.get(`${backendUrl}/api/parking/parking-list`, {
                timeout: 15000,
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            
            console.log("Parking API Response:", response.data);
            
            if (response.data.success) {
                const sanitizedParking = sanitizeParkingData(response.data.parking || []);
                console.log(`Loaded ${sanitizedParking.length} parking spots`);
                setParking(sanitizedParking);
                setError(null);
                
                // Log first parking item for debugging
                if (sanitizedParking.length > 0) {
                    console.log("First parking item:", {
                        name: sanitizedParking[0].name,
                        image: sanitizedParking[0].image,
                        rawImage: response.data.parking?.[0]?.image
                    });
                }
            } else {
                setError(response.data.message || "Failed to load parking data");
                toast.error(response.data.message || "Failed to load parking data");
                setParking([]); // Set empty array on error
            }
        } catch (error) {
            console.error("Error fetching parking data:", error);
            setError("Unable to connect to server. Please try again.");
            toast.error("Cannot connect to server. Please check your internet connection.");
            setParking([]); // Set empty array on error
        } finally {
            setLoading(false);
            setIsInitialized(true);
        }
    };

    // Fetch User Profile
    const loadUserProfileData = async () => {
        if (!token) {
            setUserData(null);
            return;
        }
        
        try {
            console.log("Loading user profile with token:", token.substring(0, 10) + "...");
            
            const response = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { 
                    'token': token,
                    'Cache-Control': 'no-cache'
                },
                timeout: 10000
            });

            console.log("User profile response:", response.data);
            
            if (response.data.success && response.data.userData) {
                const sanitizedUser = sanitizeUserData(response.data.userData);
                setUserData(sanitizedUser);
                localStorage.setItem('userData', JSON.stringify(sanitizedUser));
            } else {
                console.log("User profile not loaded:", response.data.message);
            }
        } catch (error) {
            console.error("Error loading profile:", error);
            // Don't show error for profile load failures
        }
    };

    // Initialize
    useEffect(() => {
        console.log("AppContext initializing...");
        getParkingData();
    }, []);

    // Load profile when token changes
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null);
            localStorage.removeItem('userData');
        }
    }, [token]);

    // Context Value
    const value = {
        parking,
        currencySymbol,
        backendUrl,
        getParkingData,
        isInitialized,

        token,
        setToken: (newToken) => {
            console.log("Setting token:", newToken ? newToken.substring(0, 10) + "..." : "null");
            setToken(newToken);
            if (!newToken) {
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                setUserData(null);
            } else {
                localStorage.setItem('token', newToken);
            }
        },

        userData,
        setUserData: (data) => {
            const sanitized = sanitizeUserData(data);
            setUserData(sanitized);
            if (data) {
                localStorage.setItem('userData', JSON.stringify(sanitized));
            } else {
                localStorage.removeItem('userData');
            }
        },
        loadUserProfileData,

        loading,
        error,
        
        // Helper functions for components
        sanitizeImageUrl,
        getFallbackImage
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;