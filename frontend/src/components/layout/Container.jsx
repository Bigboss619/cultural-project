import React from 'react'
import Header from './Header'
import HeroSection from './HeroSection'
import Footer from './Footer'
const Container = () => {
  return (
    <div className='min-h-screen bg-white'>
        <Header />
        <HeroSection />
        <Footer />
    </div>
  )
}

export default Container