import React from 'react'
import assets from '../assets/assets'

const Contact = () => {
  return (
    <div className='text-black'>
      <div>
        <h1 className='text-3xl font-bold'>Contact Us</h1>
        <div className='mt-10'>
          <div>
            <h1 className='text-xl '>Management Team</h1>
          </div>
          <div className='mt-4 flex-row sm:flex-col  gap-4 bg-white '>
            <img src={assets.Profile} className='flex-1 w-160 h-90 object object-cover rounded-2xl shadow' alt="" />
            <div className='flex flex-col p-5 sm:w-2/4'>
            <div >
              <h1 className='text-xl font-medium'>Nivas Malligsan - Developer of Parkin</h1>
              <p className='text-sm text-gray-500'>Parkin Admin</p>
            </div>
            <div className='mt-10'>
              <p className='text-md'>I am a passionate Artificial Intelligence student currently in My second year, dedicated to building innovative solutions that enhance everyday experiences. As the developer of PARKin, a smart parking reservation web application, I have integrated advanced technologies to streamline the parking process for both drivers and parking lot owners. 
                With expertise in React.js, Node.js, Express.js, and MongoDB, I Have designed PARKin to provide real-time parking availability, secure payments via Razorpay, and seamless user authentication using JWT, My work focuses on user-friendly interfaces, efficient backend processing, and scalable cloud deployment</p>
            </div>
            </div>

          </div>
            <div className='flex gap-5 justify-around items-center mt-10'>
              <a href="https://nivas-portfolio-in.netlify.app/" target="_blank" className='bg-primary hover:shadow-2xl duration-300 text-white w-full text-center py-2 rounded-2xl '>Visit Portfolio</a>
              <a href="https://www.linkedin.com/in/nivas-malligesan/" target="_blank" className='bg-primary hover:shadow-2xl duration-300 text-white w-full text-center py-2 rounded-2xl '>LinkedIn Profile</a>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Contact