import React from 'react'

const Legacy = () => {
  return (
    <>
        <section className="py-20 md:py-32 bg-gradient-to-br from-[#B85C3C] to-[#8B6F47] relative overflow-hidden">

            <div className="absolute inset-0 opacity-10">

                <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>

                <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl">

                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <div className="text-center mb-12">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                        Join the Legacy
                    </h2>
                    <p className="font-body text-xl text-amber-50 max-w-2xl mx-auto">
                        Become part of a vibrant community dedicated to celebrating Ibadan's heritage and building a stronger future together.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="text-center">
                            <div className="mb-4 flex justify-center">
                                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-users w-8 h-8 text-white">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                </div>
                            </div>

                            <h3 className="font-display text-xl font-bold text-white mb-3">
                                Become a Member
                            </h3>
                            <p className="font-body text-amber-50 mb-6">
                                Join our growing community and be part of something meaningful.
                            </p>
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 has-[&gt;svg]:px-3 bg-white text-[#B85C3C] hover:bg-white hover:text-[#A04A2E] font-semibold px-6 py-2 transition-colors duration-300">
                                Learn More
                            </button>
                    </div>

                    <div className="text-center">
                        <div className="mb-4 flex justify-center">
                                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar w-8 h-8 text-white" >
                                        <path d="M8 2v4"></path>
                                        <path d="M16 2v4"></path>
                                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                        <path d="M3 10h18"></path>
                                    </svg>
                                </div>
                        </div>
                            <h3 className="font-display text-xl font-bold text-white mb-3">
                                Upcoming Events
                            </h3>
                            <p className="font-body text-amber-50 mb-6">
                                Discover our calendar of cultural events and activities.
                            </p>
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 has-[&gt;svg]:px-3 bg-white text-[#B85C3C] hover:bg-white hover:text-[#A04A2E] font-semibold px-6 py-2 transition-colors duration-300">
                                    View Events
                                </button>
                    </div>

                    <div className="text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mail w-8 h-8 text-white" >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </svg>
                            </div>
                    </div>
                        <h3 className="font-display text-xl font-bold text-white mb-3">
                            Get In Touch
                        </h3>
                        <p className="font-body text-amber-50 mb-6">
                            Have questions? We'd love to hear from you.
                        </p>
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 has-[&gt;svg]:px-3 bg-white text-[#B85C3C] hover:bg-white hover:text-[#A04A2E] font-semibold px-6 py-2 transition-colors duration-300">
                            Contact Us
                            </button>
                    </div>
                </div>

            </div>
            
        </section>
    </>
  )
}

export default Legacy