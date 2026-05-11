import React from 'react'

const HeroSection = () => {
  return (
    <div>
        <section className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('../../images/hero-banner.jpg')" }}>
            </div>


        </section>
    </div>
  )
}

export default HeroSection