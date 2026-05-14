import React from 'react';

const HowToJoinStep = ({ stepData, color }) => {
  const { step, title, description } = stepData;

  return (
    <div className="text-center">
      {/* Step Number Circle */}
      <div
        className="w-12 h-12 text-white rounded-full flex items-center justify-center font-display font-bold text-lg mx-auto mb-4"
        style={{ backgroundColor: color }}
      >
        {step}
      </div>

      {/* Step Title */}
      <h3 className="font-display font-bold text-[#1A1A1A] mb-2">{title}</h3>

      {/* Step Description */}
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default HowToJoinStep;
