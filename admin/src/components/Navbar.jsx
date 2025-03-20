import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const {aToken,setAToken } = useContext(AdminContext);
    const navigate = useNavigate()

    const logout = ()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-300 bg-white'>
        <div>
        <div className='flex items-center gap-2 text-xs'>
        <h1 className='text-3xl cursor-pointer font-medium '>PARKin</h1> 
        <p className='border px-2.5 py-0.5 rounded-full border-gray-400 text-gray-600'>{aToken ? 'Admin' : 'Parking'}</p>          
        </div>
        <h1 className='text-xs font-semibold'>Dashboard Pannel</h1>
        </div>
        <button  onClick={logout} className='cursor-pointer bg-primary text-white text-sm py-2 px-10 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar