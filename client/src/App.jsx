import React, { useContext } from 'react';
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './context/AppContext';

function App() {
  const { loading, error } = useContext(AppContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading PARKin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Application</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='mx-4 sm:mx-[10%]'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parkings" element={<Parkings />} />
          <Route path="/parkings/:features" element={<Parkings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/bookings/:parkId" element={<Bookings />} />
        </Routes>
        <MobileNavbar />
        <Footer />
      </div>
    </>
  );
}

export default App;