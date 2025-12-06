import React, { useContext, useState, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { ParkingContext } from '../context/ParkingContext'
import { Sun, Moon, LogOut, Settings, User } from 'lucide-react'

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext);
    const { pToken, setPToken } = useContext(ParkingContext)
    const navigate = useNavigate()
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true'
    })
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('darkMode', darkMode)
    }, [darkMode])

    const toggleTheme = () => {
        setDarkMode(!darkMode)
    }

    const logout = () => {
        navigate('/')
        if (aToken) {
            setAToken('')
            localStorage.removeItem('aToken')
        }
        if (pToken) {
            setPToken('')
            localStorage.removeItem('pToken')
        }
        setShowDropdown(false)
    }

    return (
        <div className='z-50 sticky top-0 flex justify-between items-center px-4 sm:px-8 py-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300'>
            <div>
                <div className='flex items-center gap-2'>
                    <h1 className='text-2xl md:text-3xl cursor-pointer font-bold text-gray-800 dark:text-white'>
                        PARK<span className='text-primary dark:text-blue-400'>in</span>
                    </h1>
                    <span className='px-3 py-1 text-xs font-medium rounded-full bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-300 border border-primary/20 dark:border-blue-700'>
                        {aToken ? 'Admin' : 'Parking'} Dashboard
                    </span>
                </div>
            </div>
            
            <div className='flex items-center gap-4'>
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {darkMode ? (
                        <Sun className='w-5 h-5 text-yellow-500' />
                    ) : (
                        <Moon className='w-5 h-5 text-gray-600 dark:text-gray-300' />
                    )}
                </button>

                {/* Profile Dropdown */}
                <div className='relative'>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className='flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'
                    >
                        <div className='w-8 h-8 rounded-full bg-primary dark:bg-blue-600 flex items-center justify-center'>
                            <User className='w-4 h-4 text-white' />
                        </div>
                        <div className='hidden md:block text-left'>
                            <p className='text-sm font-medium text-gray-700 dark:text-gray-200'>
                                {aToken ? 'Administrator' : 'Parking Manager'}
                            </p>
                            <p className='text-xs text-gray-500 dark:text-gray-400'>
                                {aToken ? 'Admin Panel' : 'Parking Account'}
                            </p>
                        </div>
                    </button>

                    {showDropdown && (
                        <>
                            <div
                                className='fixed inset-0 z-40'
                                onClick={() => setShowDropdown(false)}
                            />
                            <div className='absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden'>
                                <div className='p-4 border-b border-gray-100 dark:border-gray-700'>
                                    <p className='font-semibold text-gray-900 dark:text-white'>
                                        {aToken ? 'Administrator' : 'Parking Manager'}
                                    </p>
                                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                                        {aToken ? 'System Admin' : 'Parking Account'}
                                    </p>
                                </div>
                                <div className='p-2'>
                                    <button
                                        onClick={() => {
                                            navigate(aToken ? '/admin-dashboard' : '/parking-dashboard')
                                            setShowDropdown(false)
                                        }}
                                        className='w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
                                    >
                                        <Settings className='w-4 h-4' />
                                        Dashboard
                                    </button>
                                    <button
                                        onClick={logout}
                                        className='w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors mt-1'
                                    >
                                        <LogOut className='w-4 h-4' />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar