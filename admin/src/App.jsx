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
    <div className='bg-[#f8f9fd]'>
      <ToastContainer />
      {aToken || pToken ? (
        <>
          <Navbar />
          <div className='flex items-start'>
            <Sidebar />
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
            </Routes>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
