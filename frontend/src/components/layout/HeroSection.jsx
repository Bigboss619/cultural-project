import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { IMAGE_BASE_URL } from '../../config/axios';

const HeroSection = () => {
  const [settings, setSettings] = useState({
    hero_image: null,
    hero_heading: 'Legacy Stars of Ibadan',
    hero_subheading: 'Celebrating the rich heritage, cultural pride, and community spirit of Ibadan\'s most distinguished socio-cultural group.',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const resp = await api.get('/api/public/settings');
        const data = resp.data.settings || {};
        setSettings({
          hero_image: data.hero_image || null,
          hero_heading: data.hero_heading || 'Legacy Stars of Ibadan',
          hero_subheading: data.hero_subheading || 'Celebrating the rich heritage, cultural pride, and community spirit of Ibadan\'s most distinguished socio-cultural group.',
        });
      } catch (err) {
        console.error('Failed to fetch hero settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const backgroundImage = settings.hero_image
    ? `url(${IMAGE_BASE_URL}${settings.hero_image})`
    : "url('/images/hero-banner.jpg')";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative container mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {settings.hero_heading}
          </h1>
          <p className="font-body text-xl md:text-2xl text-amber-50 mb-8 leading-relaxed">
            {settings.hero_subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/about"
              className="justify-center whitespace-nowrap rounded-md disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 has-[>svg]:px-3 bg-[#B85C3C] hover:bg-[#A04A2E] text-white px-8 py-3 text-lg font-semibold flex items-center gap-2 transition-colors duration-300"
            >
              Discover our Story
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-5 h-5">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-transparent shadow-xs dark:bg-transparent dark:border-input dark:hover:bg-input/50 h-9 has-[>svg]:px-3 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold transition-colors duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokelinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
      </div>
    </section>
  );
};

export default HeroSection;