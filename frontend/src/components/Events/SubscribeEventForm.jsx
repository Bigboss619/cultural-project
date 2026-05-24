import React, { useState } from 'react';
import api from '../../config/axios';

function NewsletterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-mail text-white/90"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 4h16v16H4z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

const SubscribeEventForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      setStatus('idle');
      setErrorMessage('');

      // Make API call to subscribe
      await api.post('/api/newsletter/subscribe', { email });

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Subscription failed:', err);
      setStatus('error');
      setErrorMessage(err?.response?.data?.message || 'Subscription failed. Please try again.');
    }
  }

  return (
    <section>
      <div className="bg-gradient-to-r from-[#B85C3C] to-[#8B4423] text-white md:py-16">
        <div className="container max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-display font-bold mb-4">Stay Updated on Events</h3>
          <p className="text-[#F9F7F4] mb-8">
            Subscribe to our newsletter to receive updates about upcoming events and cultural programs.
          </p>

          <div className="flex items-center justify-center gap-2 mb-4 text-white/90">
            <NewsletterIcon />
            <span className="text-sm">Get event announcements in your inbox</span>
          </div>

          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
            <input
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#D4A574]"
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') {
                  setStatus('idle');
                  setErrorMessage('');
                }
              }}
            />

            <button
              type="submit"
              className="px-6 py-3 bg-[#2D5016] text-white font-semibold rounded-lg hover:bg-[#1A3009] transition-colors duration-300 disabled:opacity-70"
              disabled={!email.trim() || status === 'success'}
            >
              {status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          {status === 'error' && errorMessage && (
            <p className="mt-3 text-sm text-red-200">{errorMessage}</p>
          )}

          {status === 'success' && (
            <p className="mt-3 text-sm text-green-200">Thank you for subscribing!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SubscribeEventForm;