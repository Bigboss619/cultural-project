import React from 'react'

function ContactInfoItem({ icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      {icon}
      <div>
        <h4 className="font-semibold text-[#1A1A1A] mb-1">{title}</h4>
        {children}
      </div>
    </div>
  )
}

function SocialLink({ label, href, icon }) {
  return (
    <a
      href={href}
      className="inline-block p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
    >
      <span className="sr-only">{label}</span>
      {icon}
    </a>
  )
}
const ContactInfo = () => {
  return (
   <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-display font-bold text-[#1A1A1A] mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">
              <ContactInfoItem
                title="Location"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin text-[#B85C3C] flex-shrink-0 mt-1"
                  >
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                }
              >
                <p className="text-gray-600">
                  Ibadan, Oyo State<br />Nigeria
                </p>
              </ContactInfoItem>

              <ContactInfoItem
                title="Email"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail text-[#B85C3C] flex-shrink-0 mt-1"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                }
              >
                <p className="text-gray-600">
                  <a
                    href="mailto:info@legacystars.ng"
                    className="hover:text-[#B85C3C] transition-colors"
                  >
                    info@legacystars.ng
                  </a>
                </p>
              </ContactInfoItem>

              <ContactInfoItem
                title="Phone"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone text-[#B85C3C] flex-shrink-0 mt-1"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                }
              >
                <p className="text-gray-600">
                  <a
                    href="tel:+2341234567890"
                    className="hover:text-[#B85C3C] transition-colors"
                  >
                    +234 (123) 456-7890
                  </a>
                </p>
              </ContactInfoItem>

              <ContactInfoItem
                title="Office Hours"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock text-[#B85C3C] flex-shrink-0 mt-1"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                }
              >
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </ContactInfoItem>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#B85C3C] to-[#8B4423] rounded-lg shadow-md p-8 text-white">
            <h3 className="text-xl font-display font-bold mb-4">Follow Us</h3>
            <p className="text-[#F9F7F4] mb-6">
              Stay connected with Legacy Stars on social media for updates and
              cultural content.
            </p>

            <div className="flex gap-4">
              <SocialLink
                label="Instagram"
                href="#"
                icon={
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"></path>
                  </svg>
                }
              />

              <SocialLink
                label="Facebook"
                href="#"
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                }
              />

              <SocialLink
                label="Twitter"
                href="#"
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 002.856-3.51 10 10 0 01-2.856.973 5 5 0 00-8.66 4.577 14.118 14.118 0 01-10.25-5.951 5 5 0 001.549 6.659 5 5 0 01-2.267-.616v.06a5 5 0 004.009 4.905 5 5 0 01-2.265.088 5.01 5.01 0 004.667 3.476 10.004 10.004 0 01-6.169 2.127 14.05 14.05 0 007.646 2.24c9.162 0 14.15-7.579 14.15-14.15 0-.215-.005-.43-.015-.645a10.119 10.119 0 002.460-2.548z"></path>
                  </svg>
                }
              />
            </div>
          </div>
        </div>
  )
}

export default ContactInfo