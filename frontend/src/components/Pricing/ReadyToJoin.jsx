import React from 'react';

// Color palette constants
const COLORS = {
  primary: '#B85C3C',
  primaryDark: '#A04A2E',
  gradientStart: '#2D5016',
  gradientEnd: '#1A3009',
  gold: '#D4A574',
  white: '#F9F7F4',
};

// CTA content
const CTA_CONTENT = {
  title: 'Ready to Join?',
  description:
    'Become part of Legacy Stars of Ibadan and celebrate our rich cultural heritage',
  buttonText: 'Apply for Membership',
};

const ReadyToJoin = ({ onApplyClick }) => {
  const handleApplyClick = () => {
    if (onApplyClick) {
      onApplyClick();
    }
  };

  return (
    <div className="bg-gray-100 max-6xl mx-auto">
      <CTASection
        content={CTA_CONTENT}
        colors={COLORS}
        onApplyClick={handleApplyClick}
      />
    </div>
  );
};


// Call-to-action section component
const CTASection = ({ content, colors, onApplyClick }) => (
  <div
    className="text-white py-12 md:py-16"
    style={{
      backgroundImage: `linear-gradient(to right, ${colors.gradientStart}, ${colors.gradientEnd})`,
    }}
  >
    <div className="container max-w-2xl text-center">
      {/* Title */}
      <h3 className="text-3xl font-display font-bold mb-4">
        {content.title}
      </h3>

      {/* Description */}
      <p className="mb-8" style={{ color: colors.gold }}>
        {content.description}
      </p>

      {/* CTA Button */}
      <button
        onClick={onApplyClick}
        className="px-8 py-3 text-white font-semibold rounded-lg transition-colors duration-300"
        style={{
          backgroundColor: colors.primary,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = colors.primaryDark;
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = colors.primary;
        }}
      >
        {content.buttonText}
      </button>
    </div>
  </div>
);

export default ReadyToJoin;