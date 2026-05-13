import React from 'react'

const CoreValues = () => {
  return (
    <>
        <section className='py-20 md:py-32 bg-white'>
            <div className='container mx-auto px-4 md:px-8'>
                <div className='text-center mb-16'>
                    <span className='text-[#D4A574] font-accent text-lg font-semibold'>
                        Our Core Values
                    </span>
                    <h2 className='font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-2 mb-6'>
                        What we Stand For
                    </h2>
                    <p className='font-body text-lg text-gray-600 max-w-2xl mx-auto'>
                        These principles guide every decision we make and every action we takes as an orgainization
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    <div className='card-heritage group hover:shadow-xl transition-shadow duration-300'>
                        <div className='mb-4'>
                            <div className='w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300' style="background-color: rgba(184, 92, 60, 0.125);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokelinecap="round" strokelinejoin="round" class="lucide lucide-heart w-6 h-6" data-loc="client/src/components/Values.tsx:70" style="color: rgb(184, 92, 60);">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 className='font-display text-xl font-bold text-[#1A1A1A] mb-3'>
                            Cultural Pride
                        </h3>
                        <p className='font-body text-gray-600 leading-relaxed'>
                            We celebrate and preserve the rich traditions, history, and cultural heritage of Ibadan with deep respect and authenticity.
                        </p>
                    </div>

                    <div className='card-heritage group hover:shadow-xl transition-shadow duration-300'>
                        <div className='mb-4'>
                            <div className='w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300' style="background-color: rgba(212, 165, 116, 0.125);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokelinecap="round" strokelinejoin="round" class="lucide lucide-users w-6 h-6" data-loc="client/src/components/Values.tsx:70" style="color: rgb(212, 165, 116);">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 className='font-display text-xl font-bold text-[#1A1A1A] mb-3'>
                            Community Unity
                        </h3>
                        <p className='font-body text-gray-600 leading-relaxed'>
                            We foster strong bonds among members and contribute meaningfully to the social fabric of our community.
                        </p>
                    </div>

                    <div className='card-heritage group hover:shadow-xl transition-shadow duration-300'>
                        <div className='mb-4'>
                            <div className='w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300' style="background-color: rgba(45, 80, 22, 0.125);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokelinecap="round" strokelinejoin="round" class="lucide lucide-lightbulb w-6 h-6" data-loc="client/src/components/Values.tsx:70" style="color: rgb(45, 80, 22);">
                                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path>
                                </svg>
                             </div>
                             </div>
                             <h3 class="font-display text-xl font-bold text-[#1A1A1A] mb-3">Excellence</h3>
                             <p class="font-body text-gray-600 leading-relaxed">We pursue excellence in all our endeavors, setting high standards for personal growth and collective achievement.</p>
                             </div>

                    <div className="card-heritage group hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-4">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300" style="background-color: rgba(139, 111, 71, 0.125);">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokelinecap="round" strokelinejoin="round" className="lucide lucide-shield w-6 h-6" style="color: rgb(139, 111, 71);">
                                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                                </svg>
                            </div>
                        </div>
                        <h3 className="font-display text-xl font-bold text-[#1A1A1A] mb-3">Integrity</h3>
                        <p className="font-body text-gray-600 leading-relaxed">We uphold the highest ethical standards, acting with honesty, transparency, and accountability in all our actions.</p>
                    </div>

                </div>

            </div>
        </section>
    </>
  )
}

export default CoreValues