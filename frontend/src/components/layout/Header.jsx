import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <>
        <header className="sticky top-0 z-50 bg-white shadow-md border-b border-[#E0D5C7]">
            <div className="flex items-center justify-between h-20 p-6">
                <Link to="/" className="hidden sm:inline font-display font-bold text-[#1A1A1A] text-lg">Cultural Club</Link>
                <nav>
                        <Link to="/about" className='capitalize px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#B85C3C] transition-colors duration-300 border-b-2 border-transparent hover:border-[#B8633C]'>about us</Link>
                        <Link to="/values" className='capitalize px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#B85C3C] transition-colors duration-300 border-b-2 border-transparent hover:border-[#B8633C]'>Our values</Link>
                        <Link to="/membership"  className='capitalize px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#B85C3C] transition-colors duration-300 border-b-2 border-transparent hover:border-[#B8633C]'>Membership</Link>
                        <Link to="/gallery" className='capitalize px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#B85C3C] transition-colors duration-300 border-b-2 border-transparent hover:border-[#B8633C]'>Gallery</Link>
                        <Link to="/blog" className='capitalize px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#B85C3C] transition-colors duration-300 border-b-2 border-transparent hover:border-[#B8633C]'>Blog</Link>
                        <Link to="/events" className='capitalize px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#B85C3C] transition-colors duration-300 border-b-2 border-transparent hover:border-[#B8633C]'>Events</Link>
                        <Link to="/contact" className='capitalize px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#B85C3C] transition-colors duration-300 border-b-2 border-transparent hover:border-[#B8633C]'>Contact</Link>
                </nav>

                <button className="ml-4 px-4 py-2 bg-[#E0D5C7] text-white rounded hover:bg-[#C9B8A3] transition duration-300">
                    Login In
                </button>
            </div>
        </header>
    </>
  )
}

export default Header