import { Home, Users, History, PlusCircle, Building, User, User2Icon } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { ParkingContext } from "../context/ParkingContext";


const Sidebar = () => {
  const {aToken} = useContext(AdminContext)
  const {pToken} = useContext(ParkingContext)
  return (
    <div className="sm:w-64 min-h-screen bg-white shadow-md p-4 flex flex-col justify-between">
      {/* Navigation */}
      {
        aToken &&
      <nav className="mt-6">
        <ul className="space-y-2">
          <NavLink to={'/admin-dashboard'} className={(nav) => `mb-1 flex items-center gap-3 py-2 px-3 md:px-9 mg:min-w-72 text-gray-600 duration-300 transition-all hover:bg-gray-200 rounded cursor-pointer ${nav.isActive ? 'bg-[#f2f3ff] border-r-4 text-primary border-[#14213d]' : ''}`}>
            <li className="flex items-center gap-3 ">
              <Home className="w-5 h-5 mr-2" /> Dashboard
            </li>
          </NavLink>
          <NavLink to={'/all-bookings'} className={(nav) => `mb-1 flex items-center gap-3 py-2 px-3 md:px-9 mg:min-w-72 text-gray-600 duration-300 transition-all hover:bg-gray-200 rounded cursor-pointer ${nav.isActive ? 'bg-[#f2f3ff] border-r-4 text-primary border-[#14213d]' : ''}`}>
            <li className="flex items-center gap-3 ">
              <History className="w-5 h-5 mr-2" /> Bookings
            </li>
          </NavLink>
          <NavLink to={'/add-parking'} className={(nav) => `mb-1 flex items-center gap-3 py-2 px-3 md:px-9 mg:min-w-72 text-gray-600 duration-300 transition-all hover:bg-gray-200 rounded cursor-pointer ${nav.isActive ? 'bg-[#f2f3ff] border-r-4 text-primary border-[#14213d]' : ''}`}>
            <li className="flex items-center gap-3 ">
              <PlusCircle className="w-5 h-5 mr-2" /> Add Parking
            </li >
          </NavLink>
          <NavLink to={'/parking-list'} className={(nav) => `mb-1 flex items-center gap-3 py-2 px-3 md:px-9 mg:min-w-72 text-gray-600 duration-300 transition-all hover:bg-gray-200 rounded cursor-pointer ${nav.isActive ? 'bg-[#f2f3ff] border-r-4 text-primary border-[#14213d]' : ''}`}>
            <li className="flex items-center gap-3 ">
              <Building className="w-5 h-5 mr-2" /> Parking List
            </li>
          </NavLink>
        </ul>
      </nav>
      }
      {
        pToken &&
      <nav className="mt-6">
        <ul className="space-y-2">
          <NavLink to={'/parking-dashboard'} className={(nav) => `mb-1 flex items-center gap-3 py-2 px-3 md:px-9 mg:min-w-72 text-gray-600 duration-300 transition-all hover:bg-gray-200 rounded cursor-pointer ${nav.isActive ? 'bg-[#f2f3ff] border-r-4 text-primary border-[#14213d]' : ''}`}>
            <li className="flex items-center gap-3 ">
              <Home className=" w-6 h-6 sm:mr-2" />
              <p className="hidden md:block" >Dashboard</p> 
            </li>
          </NavLink>
          <NavLink to={'/parking-bookings'} className={(nav) => `mb-1 flex items-center gap-3 py-2 px-3 md:px-9 mg:min-w-72 text-gray-600 duration-300 transition-all hover:bg-gray-200 rounded cursor-pointer ${nav.isActive ? 'bg-[#f2f3ff] border-r-4 text-primary border-[#14213d]' : ''}`}>
            <li className="flex items-center gap-3 ">
              <History className=" w-6 h-6 sm:mr-2" /> 
              <p className="hidden md:block" >Bookings</p> 
            </li>
          </NavLink>
          <NavLink to={'/parking-profile'} className={(nav) => `mb-1 flex items-center gap-3 py-2 px-3 md:px-9 mg:min-w-72 text-gray-600 duration-300 transition-all hover:bg-gray-200 rounded cursor-pointer ${nav.isActive ? 'bg-[#f2f3ff] border-r-4 text-primary border-[#14213d]' : ''}`}>
            <li className="flex items-center gap-3 ">
              <User2Icon className=" w-6 h-6 sm:mr-2" /> 
              <p className="hidden md:block" >Profile</p> 
            </li >
          </NavLink>
        </ul>
      </nav>
      }
    </div>
  );
};

export default Sidebar;