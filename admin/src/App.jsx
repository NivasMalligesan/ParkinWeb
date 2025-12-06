import React, { useContext } from 'react'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import Allbookings from './pages/Admin/Allbookings'
import AddParking from './pages/Admin/AddParking'
import ParkingsList from './pages/Admin/ParkingsList'
import { ParkingContext } from './context/ParkingContext'
import ParkingDashboard from './pages/Parking/ParkingDashboard'
import ParkingBookings from './pages/Parking/ParkingBookings'
import ParkingProfile from './pages/Parking/ParkingProfile'

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { pToken } = useContext(ParkingContext);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
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
      
      {aToken || pToken ? (
        <>
          <Navbar />
          <div className='flex'>
            <Sidebar />
            <div className='flex-1 p-4 md:p-6 lg:p-8 ml-0 lg:ml-64 transition-all duration-300'>
              <Routes>
                <Route path='/' element={<Navigate to={aToken ? "/admin-dashboard" : "/parking-dashboard"} />} />
                {/* Admin Routes */}
                <Route path='/admin-dashboard' element={<Dashboard />} />
                <Route path='/all-bookings' element={<Allbookings />} />
                <Route path='/add-parking' element={<AddParking />} />
                <Route path='/parking-list' element={<ParkingsList />} />
                {/* Parking Routes */}
                <Route path='/parking-dashboard' element={<ParkingDashboard />} />
                <Route path='/parking-bookings' element={<ParkingBookings />} />
                <Route path='/parking-profile' element={<ParkingProfile />} />
                
                {/* Fallback route */}
                <Route path='*' element={
                  <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">Page not found</p>
                      <button 
                        onClick={() => window.history.back()}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;