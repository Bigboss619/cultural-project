import React, { useEffect, useState } from 'react';
import api from '../../config/axios';

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({
    social_facebook: '#',
    social_twitter: '#',
    social_instagram: '#',
    social_youtube: '#',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const resp = await api.get('/api/public/settings');
        const data = resp.data.settings || {};
        setSocialLinks({
          social_facebook: data.social_facebook || '#',
          social_twitter: data.social_twitter || '#',
          social_instagram: data.social_instagram || '#',
          social_youtube: data.social_youtube || '#',
        });
      } catch (err) {
        console.error('Failed to fetch social settings:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-bold text-[#D4A574] mb-4">Legacy Stars</h3>
            <p className="font-body text-gray-400 leading-relaxed">Celebrating Ibadan's heritage and building community pride.</p>
            <div className="flex gap-4 mt-6">
              <a href={socialLinks.social_facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-[#B85C3C] rounded-lg flex items-center justify-center hover:bg-[#D4A574] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook w-5 h-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href={socialLinks.social_twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-10 h-10 bg-[#B85C3C] rounded-lg flex items-center justify-center hover:bg-[#D4A574] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter w-5 h-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href={socialLinks.social_instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-[#B85C3C] rounded-lg flex items-center justify-center hover:bg-[#D4A574] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram w-5 h-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a href={socialLinks.social_youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-[#B85C3C] rounded-lg flex items-center justify-center hover:bg-[#D4A574] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube w-5 h-5">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-white mb-4">Organization</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">About Us</a>
              </li>
              <li>
                <a href="#values" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">Our Values</a>
              </li>
              <li>
                <a href="#traditions" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">Traditions</a>
              </li>
              <li>
                <a href="#contact" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">Events</a>
              </li>
              <li>
                <a href="/blog" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">Blog</a>
              </li>
              <li>
                <a href="/gallery" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">Gallery</a>
              </li>
              <li>
                <a href="/membership" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">Membership</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="/privacy-policy" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms-of-service" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">Terms of Service</a>
              </li>
              <li>
                <a href="/code-of-conduct" className="font-body text-gray-400 hover:text-[#D4A574] transition-colors duration-300">Code of Conduct</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-gray-400 text-sm">© 2026 Legacy Stars of Ibadan. All rights reserved.</p>
            <p className="font-body text-gray-400 text-sm">Designed with <span className="text-[#B85C3C]">♥</span> for our community</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;