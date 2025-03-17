import React from 'react';
import { Linkedin, Instagram, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-black mt-20 py-6 sm:px-10 md:px-16 lg:px-20 flex justify-between">
      {/* App Name */}
      <h2 className="text-lg sm:text-xl font-semibold">PARKin</h2>

        <p className="text-sm text-gray-400 hidden sm:block ">© {new Date().getFullYear()} Parkin. All Rights Reserved.</p>
      {/* Social Links */}
      <div className="flex space-x-6">
        <a 
          href="https://www.linkedin.com/in/your-profile" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <Linkedin className="w-6 h-6 text-black hover:text-black" />
        </a>
        
        <a 
          href="https://www.instagram.com/your-profile" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <Instagram className="w-6 h-6 text-black hover:text-black" />
        </a>
        
        <a 
          href="https://yourportfolio.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
        >
          <Globe className="w-6 h-6 text-black hover:text-black" />
        </a>
      </div>

      {/* Copyright */}
    </footer>
  );
};

export default Footer;
