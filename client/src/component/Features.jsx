import React from 'react'
import { features } from '../assets/assets'
import {Link} from 'react-router-dom'
import { motion } from "motion/react"
import {Card, CardHeader, CardBody, Image} from "@heroui/react";


const Features = () => {
  return (
    <motion.div 
    initial={{opacity:0,y:100}}
    animate={{opacity:1,y:0}}
    whileInView={{ opacity: 1}} // Animation when in view
    transition={{ duration: 0.5 }}
    viewport={{ once: true,}} 
    className='flex flex-col items-center gap-4 py-16 text-gray-800' id='features'>
        <h1 className='text-3xl font-medium '>
          Find By Features
        </h1>
        <p className='sm:w-1/3 text-center text-sm'>Easily search for parking spaces With Our Extensive List of Features, Schedule Your Parking Hassle-free!</p>
        <motion.div
        initial={{opacity:0,x:-100}}
        whileInView={{opacity:1,x:0}}
        transition={{duration:0.5}}
        viewport={{once:true}}
        className='flex pt-5 w-full overflow-scroll'>
          {features.map((item,index)=>(
            <Link key={index} to={`/parkings/${item.feature}`} className='flex flex-col items-center rounded p-4 text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
                <div className="w-72 bg-white shadow-lg rounded-2xl p-4">
                  <div className="pb-2">
                    <p className="text-xs uppercase font-bold text-gray-500">Parkings</p>
                    <h4 className="font-bold text-lg mt-1">{item.feature}</h4>
                  </div>
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt="Frontend Radio"
                      className="object-cover w-full rounded-xl"
                    />
                  </div>
                </div>

            </Link>
          ))}

        </motion.div> 
       
         
            
    </motion.div>
  )
}

export default Features