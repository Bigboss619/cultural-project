import React, { useState } from 'react';
import CheckIcon from './CheckIcon';
import PaymentModal from '../Payment/PaymentModal';

const PricingCard = ({
  name,
  description,
  price,
  isHighlighted,
  buttonText,
  features,
  colors,
  amount = 0,
}) => {
  const [showPayment, setShowPayment] = useState(false);

  const isHighlightedStyle = isHighlighted
    ? {
        backgroundImage: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})`,
        textColor: 'white',
        scale: 'scale-105',
        shadow: 'shadow-xl',
      }
    : {
        backgroundColor: 'white',
        textColor: colors.text,
        scale: '',
        shadow: 'shadow-md hover:shadow-lg',
      };

  const handleJoinClick = () => {
    if (amount > 0) {
      setShowPayment(true);
    } else {
      // Free tier - could redirect to signup form
      alert('Free membership signup coming soon!');
    }
  };

  return (
    <>
      <div
        className={`rounded-lg overflow-hidden transition-all duration-300 ${isHighlightedStyle.shadow} ${isHighlightedStyle.scale}`}
        style={{
          backgroundColor: isHighlightedStyle.backgroundColor,
          backgroundImage: isHighlightedStyle.backgroundImage,
        }}
      >
        <div className="p-8">
          {/* Title */}
          <h3
            className="text-2xl font-display font-bold mb-2"
            style={{ color: isHighlighted ? 'white' : colors.text }}
          >
            {name}
          </h3>

          {/* Description */}
          <p
            className="text-sm mb-4"
            style={{ color: isHighlighted ? colors.white : '#999' }}
          >
            {description}
          </p>

          {/* Price */}
          <div
            className="text-4xl font-display font-bold mb-6"
            style={{
              color: isHighlighted ? colors.gold : colors.primary,
            }}
          >
            {price}
          </div>

          {/* Features List */}
          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckIcon
                  color={isHighlighted ? colors.gold : colors.primary}
                />
                <span className="text-sm" style={{ color: isHighlighted ? colors.white : colors.text }}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button
            className="w-full py-3 font-semibold rounded-lg transition-colors duration-300"
            style={{
              backgroundColor: isHighlighted ? 'white' : colors.primary,
              color: isHighlighted ? colors.primary : 'white',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = isHighlighted
                ? '#F9F7F4'
                : '#A04A2E';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = isHighlighted
                ? 'white'
                : colors.primary;
            }}
            onClick={handleJoinClick}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          amount={amount}
          description={`${name} Membership`}
          paymentType="membership"
        />
      )}
    </>
  );
};

export default PricingCard;