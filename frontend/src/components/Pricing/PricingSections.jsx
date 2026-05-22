import React from 'react';
import CheckIcon from './CheckIcon';
import PricingCard from './PricingCard';
import HowToJoinStep from './HowToJoinStep';

// Color palette constants
const COLORS = {
  primary: '#B85C3C',
  primaryDark: '#A04A2E',
  secondary: '#8B4423',
  gold: '#D4A574',
  white: '#F9F7F4',
  text: '#1A1A1A',
  textGray: '#666666',
};

// Membership tiers data - amounts in Naira
const MEMBERSHIP_TIERS = [
  {
    id: 'community',
    name: 'Community Member',
    description: 'Join our community and stay connected',
    price: 'Free',
    amount: 0,
    isHighlighted: false,
    buttonText: 'Join Now',
    features: [
      'Access to community events',
      'Monthly newsletter',
      'Community forum access',
      'Event discounts',
    ],
  },
  {
    id: 'active',
    name: 'Active Member',
    description: 'Full participation in all programs',
    price: '₦5,000/year',
    amount: 5000,
    isHighlighted: true,
    buttonText: 'Join Now',
    features: [
      'All Community Member benefits',
      'Voting rights',
      'Exclusive workshops',
      'Member spotlight features',
      'Priority event registration',
    ],
  },
  {
    id: 'patron',
    name: 'Patron Member',
    description: 'Support our cultural mission',
    price: '₦25,000/year',
    amount: 25000,
    isHighlighted: false,
    buttonText: 'Become a Patron',
    features: [
      'All Active Member benefits',
      'Recognition in annual report',
      'Exclusive patron events',
      'Mentorship opportunities',
      'Cultural project involvement',
    ],
  },
];

// Steps to join data
const JOIN_STEPS = [
  {
    step: 1,
    title: 'Fill Application',
    description:
      'Complete our membership application form with your basic information',
  },
  {
    step: 2,
    title: 'Pay Dues',
    description:
      'Complete payment for your chosen membership tier (if applicable)',
  },
  {
    step: 3,
    title: 'Get Started',
    description:
      'Receive your membership card and access to all member benefits',
  },
];

const PricingSections = () => {
  return (
    <div className="space-y-12">
      <PricingCardsSection />
      <HowToJoinSection />
    </div>
  );
};

// Pricing cards section component
const PricingCardsSection = () => (
  <div className="container m-auto py-12 md:py-16">
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      {MEMBERSHIP_TIERS.map((tier) => (
        <PricingCard
          key={tier.id}
          name={tier.name}
          description={tier.description}
          price={tier.price}
          amount={tier.amount}
          isHighlighted={tier.isHighlighted}
          buttonText={tier.buttonText}
          features={tier.features}
          colors={COLORS}
        />
      ))}
    </div>
  </div>
);

// How to join section component
const HowToJoinSection = () => (
  <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
    <h2 className="text-3xl font-display font-bold text-[#1A1A1A] mb-8">
      How to Join
    </h2>
    <div className="grid md:grid-cols-3 gap-8">
      {JOIN_STEPS.map((stepData) => (
        <HowToJoinStep key={stepData.step} stepData={stepData} color={COLORS.primary} />
      ))}
    </div>
  </div>
);

export default PricingSections;