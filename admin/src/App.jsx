import React, { useContext } from 'react'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer,toast } from 'react-toastify'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import Allbookings from './pages/Admin/Allbookings'
import AddParking from './pages/Admin/AddParking'
import ParkingsList from './pages/Admin/ParkingsList'

const App = () => {
  const {aToken} = useContext(AdminContext)
  return aToken ? (
    <div className='bg-[#f8f9fd]'> 
    <ToastContainer/>
    <Navbar/>
    <div className='flex items-start'>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<></>}/>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
        <Route path='/all-bookings' element={<Allbookings/>}/>
        <Route path='/add-parking' element={<AddParking/>}/>
        <Route path='/parking-list' element={<ParkingsList/>}/>
      </Routes>
    </div>
    </div>
  ):(
    <>
        <Login/>
        <ToastContainer/>
    </>
  )
}

export default App