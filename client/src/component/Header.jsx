import React from 'react'
import assets from '../assets/assets'
import { motion } from "motion/react"
import { FaArrowRight } from 'react-icons/fa'

const Header = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y:100}} // Initial state
    animate={{ opacity: 1, y:0 }}   // Final state on render
    whileInView={{ opacity: 1, scale: 1 }} // Animation when in view
    transition={{ duration: 0.5 }}
    viewport={{ once: true,}} // Smooth transition
    className='sm:mt-20 mt-5 flex md:flex-row  bg-primary rounded-lg px-6 md:px-10 lg:px-20 relative'
    >
        {/* Left side of the header */}
        <div className='w-1/2 flex flex-col items-start justify-center gap-4 py-10 sm:py-20 md:py-[5vw]'>
            <p className=' text-xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
                Find, Reserve and Park<br /> Parking at Your Fingertips
            </p>
            <div className='flex items-center gap-5'>
                <img src={assets.group_profiles} alt="" className="w-15  sm:w-32 h-auto" />
                <p className='text-white sm:hidden text-xs'>
                  100+ Plus Trusted CUstomers
                </p>
                <p className='text-white hidden sm:block text-sm'>
                    Book parking spots in seconds <br className='hidden sm:block'/> Say goodbye to parking hassles with real-time availability!
                </p>
            </div>
            <a href="#features" className=' flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg font-semibold group'>
                Book Parking <FaArrowRight className='group-hover:-rotate-45 duration-300' />
            </a>
        </div>
        {/* right sidee */}
        <div className='w-1/2 relative'>
          <img className='w-full absolute bottom-0 h-auto rounded-lg' src={assets.header} alt="" />
        </div>

    </motion.div>
  )
}

export default Header
