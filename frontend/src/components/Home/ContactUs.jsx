import React from 'react'

const ContactUs = () => {
  return (
    <>
            <section id="contact" className="py-20 md:py-32 bg-white">

                <div className="container mx-auto px-4 md:px-8">

                    <div className="text-center mb-16">
                        <span className="text-[#D4A574] font-accent text-lg font-semibold">
                            Get In Touch
                        </span>
                        <h2  className="font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] mt-2 mb-6">
                            Contact Us
                        </h2>
                        <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
                            Have a question or want to learn more? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                        <div>
                            <form className="space-y-6">

                                <div>
                                    <label for="name" className="block font-body font-semibold text-[#1A1A1A] mb-2">
                                        Full Name
                                    </label>
                                    <input id="name" required="" className="w-full px-4 py-3 border border-[#E0D5C7] rounded-lg font-body text-gray-700 focus:outline-none focus:border-[#B85C3C] focus:ring-2 focus:ring-[#B85C3C]/20 transition-colors duration-300" placeholder="Your name" type="text" value="" name="name" />
                                </div>

                                <div>
                                    <label  for="email" className="block font-body font-semibold text-[#1A1A1A] mb-2">Email Address</label>
                                    <input id="email" required="" className="w-full px-4 py-3 border border-[#E0D5C7] rounded-lg font-body text-gray-700 focus:outline-none focus:border-[#B85C3C] focus:ring-2 focus:ring-[#B85C3C]/20 transition-colors duration-300" placeholder="your.email@example.com" type="email" value="" name="email" />
                                </div>

                                <div>
                                    <label for="subject" className="block font-body font-semibold text-[#1A1A1A] mb-2">
                                        Subject
                                    </label>
                                    <input id="subject" required="" className="w-full px-4 py-3 border border-[#E0D5C7] rounded-lg font-body text-gray-700 focus:outline-none focus:border-[#B85C3C] focus:ring-2 focus:ring-[#B85C3C]/20 transition-colors duration-300" placeholder="How can we help?" type="text" value="" name="subject" />
                                </div>

                                <div>
                                    <label for="message" className="block font-body font-semibold text-[#1A1A1A] mb-2">
                                        Message
                                    </label>
                                    <textarea id="message" name="message" required="" rows="5" className="w-full px-4 py-3 border border-[#E0D5C7] rounded-lg font-body text-gray-700 focus:outline-none focus:border-[#B85C3C] focus:ring-2 focus:ring-[#B85C3C]/20 transition-colors duration-300 resize-none" placeholder="Your message here...">
                                    </textarea>
                                </div>
                                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 has-[&gt;svg]:px-3 w-full bg-[#B85C3C] hover:bg-[#A04A2E] text-white font-semibold py-3 rounded-lg transition-colors duration-300" type="submit">
                                Send Message
                                </button>
                            </form>

                        </div>
                        <div className="space-y-8">

                            <div className="card-heritage">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#B85C3C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokelinecap="round" strokelinejoin="round" className="lucide lucide-map-pin w-6 h-6 text-[#B85C3C]" data-loc="client/src/components/Contact.tsx:150">
                                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </div>

                                    <div>
                                        <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-2">Location</h3>
                                        <p className="font-body text-gray-600">Ibadan, Oyo State
                                            <br />Nigeria
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="card-heritage">

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-[#D4A574]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokelinecap="round" strokelinejoin="round" className="lucide lucide-mail w-6 h-6 text-[#D4A574]">
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                        </svg>
                                    </div>
                                <div>
                    <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-2">Email</h3>
                    <p className="font-body text-gray-600">
                        <a href="mailto:info@legacystarsibadan.org" className="hover:text-[#B85C3C] transition-colors">info@legacystarsibadan.org</a>
                        </p>
                        </div>
                                </div>

                            </div>

                            <div className="card-heritage">

                                <div className="flex items-start gap-4">

                                    <div className="w-12 h-12 bg-[#2D5016]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokelinecap="round" strokelinejoin="round" className="lucide lucide-phone w-6 h-6 text-[#2D5016]" >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </div>

                                    <div>
                                        <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-2">Phone</h3>
                                        <p className="font-body text-gray-600">
                                            <a href="tel:+2348000000000" className="hover:text-[#B85C3C] transition-colors">+234 (800) 000-0000</a>
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#F5F1E8] to-[#E8DCC8] rounded-lg p-6 border border-[#E0D5C7]">
                                <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-3">Office Hours</h3>
                                <div className="font-body text-gray-600 space-y-2">
                                    <p>
                                        <span  className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM
                                    </p>

                                    <p>
                                        <span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM
                                    </p>

                                    <p>
                                        <span className="font-semibold">Sunday:</span> Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
    </>
  )
}

export default ContactUs