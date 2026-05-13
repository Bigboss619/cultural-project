import React from 'react'

const Heritage = () => {
  return (
    <>
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-[#F5F1E8]">

            <div className="container mx-auto px-4 md:px-8">
                <div className="mb-16">
                        <span className="text-[#D4A574] font-accent text-lg font-semibold">
                            Our Heritage
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-2 mb-6">
                            Living Traditions
                        </h2>
                        <p className="font-body text-lg text-gray-600 max-w-3xl">
                            Through our various programs and initiatives, we keep the spirit of Ibadan's heritage alive while building bridges to the future.
                        </p>
                </div>

                <div className="mb-16">
                    <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                        <img alt="Yoruba Traditions and Cultural Heritage" className="w-full h-full object-cover" src="/images/traditions.jpg" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent">
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="relative pl-8 py-6 border-l-4 border-[#B85C3C] hover:border-[#D4A574] transition-colors duration-300">
                    <div className="absolute -left-3 top-8 w-5 h-5 bg-[#B85C3C] rounded-full">
                        </div>
                        <h3  className="font-display text-2xl font-bold text-[#1A1A1A] mb-3">
                            Annual Festivals
                        </h3>
                        <p className="font-body text-gray-600 leading-relaxed">
                            Celebrate Ibadan's cultural calendar with traditional festivals that bring our community together in joyous celebration.
                        </p>
                    </div>

                    <div className="relative pl-8 py-6 border-l-4 border-[#B85C3C] hover:border-[#D4A574] transition-colors duration-300">
                        <div className="absolute -left-3 top-8 w-5 h-5 bg-[#B85C3C] rounded-full"></div>
                        <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-3">
                            Heritage Education
                        </h3>
                        <p className="font-body text-gray-600 leading-relaxed">
                            Learn and share the history, language, and traditions of Ibadan through educational workshops and seminars.
                        </p>
                    </div>

                    <div className="relative pl-8 py-6 border-l-4 border-[#B85C3C] hover:border-[#D4A574] transition-colors duration-300">
                        <div className="absolute -left-3 top-8 w-5 h-5 bg-[#B85C3C] rounded-full"></div>
                        <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-3">
                            Community Service
                        </h3>
                        <p className="font-body text-gray-600 leading-relaxed">
                            Give back to society through volunteer initiatives and social development projects that benefit our community.
                        </p>
                    </div>

                    <div className="relative pl-8 py-6 border-l-4 border-[#B85C3C] hover:border-[#D4A574] transition-colors duration-300">
                        <div className="absolute -left-3 top-8 w-5 h-5 bg-[#B85C3C] rounded-full"></div>
                            <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-3">
                                Arts & Culture
                            </h3>
                            <p className="font-body text-gray-600 leading-relaxed">
                                Support local artists and craftspeople, preserving traditional arts while fostering contemporary creative expression.
                            </p>
                    </div>
                </div>
            </div>
            
        </section>
    </>
        )
        }

export default Heritage