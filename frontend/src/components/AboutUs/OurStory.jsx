import React, { useEffect, useState } from 'react';
import api from '../../config/axios';

const OurStory = () => {
  const [settings, setSettings] = useState({
    about_heading: 'Preserving Heritage, Building Community',
    about_content: 'Legacy Stars of Ibadan stands as a beacon of cultural pride and community excellence. Founded on the principles of preserving Ibadan\'s rich heritage while fostering contemporary connections, we bring together individuals who share a passion for celebrating our shared history and values.',
  });
  const [about_image, setAboutImage] = useState('/images/cultural-heritage.jpg');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const resp = await api.get('/api/public/settings');
        const data = resp.data.settings || {};
        setSettings({
          about_heading: data.about_heading || 'Preserving Heritage, Building Community',
          about_content: data.about_content || 'Legacy Stars of Ibadan stands as a beacon of cultural pride and community excellence.',
        });
        if (data.about_image) {
          setAboutImage(`http://localhost:5000${data.about_image}`);
        }
      } catch (err) {
        console.error('Failed to fetch about settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className='py-20 md:py-32 bg-gradient-to-b from-[#F5F1E8] to-white pattern-bg'>
      <div className='container mx-auto px-4 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center'>
          <div className='order-2 md:order-1'>
            <div className='mb-4'>
              <span className='text-[#D4A574] font-accent text-lg font-semibold'>
                Our Story
              </span>
            </div>
            <h2 className='font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-6'>
              {settings.about_heading}
            </h2>
            <p className='font-body text-lg text-gray-700 mb-6 leading-relaxed'>
              {settings.about_content}
            </p>
            <div className='grid grid-cols-3 gap-6 mt-12'>
              <div>
                <p className='font-display text-3xl md:text-4xl font-bold text-[#B85C3C] mb-2'>500+</p>
                <p className='font-body text-sm md:text-base text-gray-600'>
                  Active Members
                </p>
              </div>

              <div>
                <p className='font-display text-3xl md:text-4xl font-bold text-[#B85C3C] mb-2'>
                  25+
                </p>
                <p className='font-body text-sm md:text-base text-gray-600'>
                  Years of Impact
                </p>
              </div>

              <div>
                <p className='font-display text-3xl md:text-4xl font-bold text-[#B85C3C] mb-2'>
                  100+
                </p>
                <p className='font-body text-sm md:text-base text-gray-600'>
                  Annual Events
                </p>
              </div>
            </div>
          </div>

          <div className='order-1 md:order-2'>
            <div className='relative overflow-hidden'>
              <img className='w-full h-auto rounded-lg shadow-xl' alt='Legacy Stars of Ibadan Community' src={about_image}/>
              <div className='absolute -bottom-4 -right-4 w-24 h-24 bg-[#D4A574] rounded-lg opacity-20 blur-xl'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;