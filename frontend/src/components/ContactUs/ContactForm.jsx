import React, { useState } from 'react'

function ContactMessageForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.full_name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!formData.email.trim()) {
      setError('Please enter your email')
      return
    }
    if (!formData.subject.trim()) {
      setError('Please enter a subject')
      return
    }
    if (!formData.message.trim()) {
      setError('Please enter your message')
      return
    }

    try {
      setSubmitting(true)
      setError('')

      const resp = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!resp.ok) {
        const data = await resp.json()
        throw new Error(data.message || 'Failed to send message')
      }

      setSuccess(true)
      setFormData({ full_name: '', email: '', subject: '', message: '' })

      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-display font-bold text-[#1A1A1A] mb-6">
        Send us a Message
      </h2>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Thank you! Your message has been sent successfully. We'll get back to you soon.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Full Name
          </label>
          <input
            required
            className="w-full px-4 py-2 border border-[#E0D5C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85C3C]"
            placeholder="Your name"
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
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
            name="email"
            value={formData.email}
            onChange={handleChange}
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
            name="subject"
            value={formData.subject}
            onChange={handleChange}
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
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 bg-[#B85C3C] text-white font-semibold rounded-lg hover:bg-[#A04A2E] transition-colors duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
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
            </>
          )}
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