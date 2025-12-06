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
    const [isBackendConnected, setIsBackendConnected] = useState(false);

    console.log("Backend URL:", backendUrl);

    // Test backend connection
    const testBackendConnection = async () => {
        try {
            const response = await axios.get(`${backendUrl}/health`, { timeout: 5000 });
            console.log("Backend health check:", response.data);
            setIsBackendConnected(true);
            return true;
        } catch (error) {
            console.error("Backend connection failed:", error.message);
            setIsBackendConnected(false);
            return false;
        }
    };

    // Helper function to validate and fix image URLs
const validateImageUrl = (url, fallbackType = 'parking') => {
  if (!url || url === 'undefined' || url.includes('undefined')) {
    // Return appropriate fallback image
    switch(fallbackType) {
      case 'user':
        return 'https://api.dicebear.com/7.x/avataaars/svg?seed=user';
      case 'parking':
        return 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop&auto=format';
      default:
        return 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&h=300&fit=crop&auto=format';
    }
  }
  
  // Ensure URL has protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  
  return url;
};

// Then in your getParkingData function:
const getParkingData = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`${backendUrl}/api/parking/parking-list`);
    
    if (data.success && data.parking) {
      // Clean up parking data with valid image URLs
      const cleanedParking = data.parking.map(park => ({
        ...park,
        image: validateImageUrl(park.image, 'parking'),
        available: park.available !== undefined ? park.available : true,
        pricePerHour: park.pricePerHour || 0,
        totalCapacity: park.totalCapacity || 0,
        rating: park.rating || 4.2
      }));
      
      setParking(cleanedParking);
      setError(null);
    } else {
      setError(data.message || "Failed to load parking data");
    }
  } catch (error) {
    console.error("Error fetching parking data:", error);
    setError("Network error. Please check your connection.");
  } finally {
    setLoading(false);
  }
}


    // Fetch User Profile
    const loadUserProfileData = async () => {
        if (!token) {
            setUserData(null);
            return;
        }
        
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { token },
                timeout: 10000
            });

            if (data.success && data.userData) {
                // Ensure image URL is valid
                const userDataWithValidImage = {
                    ...data.userData,
                    image: data.userData.image || getDefaultUserImage(data.userData.name)
                };
                setUserData(userDataWithValidImage);
                localStorage.setItem('userData', JSON.stringify(userDataWithValidImage));
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    };

    // Helper function to get default user image
    const getDefaultUserImage = (name = "User") => {
        return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
    };

    // Initialize default user data if needed
    const getInitialUserData = () => {
        if (storedUserData) {
            const parsed = JSON.parse(storedUserData);
            return {
                ...parsed,
                image: parsed.image || getDefaultUserImage(parsed.name)
            };
        }
        return null;
    };

    // Load Parking Data Once
    useEffect(() => {
        console.log("Loading parking data from:", backendUrl);
        getParkingData();
    }, []);

    // Load Profile When Token Exists or Changes
    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(null);
        }
    }, [token]);

    // Context Value
    const value = {
        parking,
        currencySymbol,
        backendUrl,
        getParkingData,
        isBackendConnected,

        token,
        setToken: (newToken) => {
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
            const userWithImage = {
                ...data,
                image: data?.image || getDefaultUserImage(data?.name)
            };
            setUserData(userWithImage);
            if (data) {
                localStorage.setItem('userData', JSON.stringify(userWithImage));
            } else {
                localStorage.removeItem('userData');
            }
        },
        loadUserProfileData,

        loading,
        error
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;