import React from 'react'

function ContactMessageForm() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-display font-bold text-[#1A1A1A] mb-6">
        Send us a Message
      </h2>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Full Name
          </label>
          <input
            required
            className="w-full px-4 py-2 border border-[#E0D5C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85C3C]"
            placeholder="Your name"
            type="text"
            value=""
            name="fullName"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Email Address
          </label>
          <input
            required
            className="w-full px-4 py-2 border border-[#E0D5C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85C3C]"
            placeholder="your@email.com"
            type="email"
            value=""
            name="email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Subject
          </label>
          <input
            required
            className="w-full px-4 py-2 border border-[#E0D5C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85C3C]"
            placeholder="What is this about?"
            type="text"
            value=""
            name="subject"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Message
          </label>
          <textarea
            name="message"
            required
            rows="5"
            className="w-full px-4 py-2 border border-[#E0D5C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85C3C] resize-none"
            placeholder="Your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#B85C3C] text-white font-semibold rounded-lg hover:bg-[#A04A2E] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-send"
          >
            <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
            <path d="m21.854 2.147-10.94 10.939"></path>
          </svg>
          Send Message
        </button>
      </form>
    </div>
  )
}


const ContactForm = () => {
  return (
        <ContactMessageForm />
  )
}

export default ContactForm

