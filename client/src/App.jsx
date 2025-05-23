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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MobileNavbar from './component/MobileNavbar';

function App() {
  return (
    <>
      <ToastContainer />
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
        <MobileNavbar/>
        <Footer />
      </div>
    </>
  );
}

export default App;
