import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Parkings from './pages/Parkings';
import Login from './pages/Login';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyBookings from './pages/MyBookings';
import Bookings from './pages/Bookings';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import MobileNavbar from './component/MobileNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './context/AppContext';

function App() {
  const { loading, error, parking } = useContext(AppContext);

  // Debug logging
  useEffect(() => {
    console.log("App State:", { loading, error, parkingCount: parking?.length });
  }, [loading, error, parking]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
            </div>
          </div>
          <p className="mt-6 text-gray-600 font-medium">Loading PARKin...</p>
          <p className="text-sm text-gray-400 mt-2">Fetching parking data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-6">{error || "Unable to connect to the server"}</p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
            >
              🔄 Retry Connection
            </button>
            <button 
              onClick={() => toast.info("Try checking your internet connection or contact support.")}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              ℹ️ Get Help
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-6">
            If this persists, check if the backend server is running
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <div className='mx-4 sm:mx-6 md:mx-8 lg:mx-[10%] pt-4 pb-20'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parkings" element={<Parkings />} />
            <Route path="/parkings/:features" element={<Parkings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/bookings/:parkId" element={<Bookings />} />
            
            {/* Fallback route */}
            <Route path="*" element={
              <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                  <p className="text-gray-600 mb-6">Page not found</p>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            } />
          </Routes>
        </div>
        <MobileNavbar />
        <Footer />
      </div>
    </>
  );
}

export default App;