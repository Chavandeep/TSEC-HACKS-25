import React from 'react';
import LoyaltyCard from './LoyaltyCard'; // Adjust the import path as needed

const plansData = [
  {
    plan: 'Basic Plan',
    price: '500',
    features: [
      { text: '1 team member', disabled: false },
      { text: 'Listing on App', disabled: false },
      { text: 'Basic analytics', disabled: false },
      { text: 'Standard logistic support', disabled: true },
      { text: 'Social media promotion', disabled: true },
      { text: 'Discounted delivery services', disabled: true },
      { text: '24×7 support', disabled: true },
    ],
    buttonText: 'Choose Basic Plan',
  },
  {
    plan: 'Standard Plan',
    price: '1000',
    features: [
      { text: '3 team members', disabled: false },
      { text: 'Priority listing on App', disabled: false },
      { text: 'Advanced analytics', disabled: false },
      { text: 'Enhanced logistic support', disabled: false },
      { text: 'Social media promotion (Facebook Marketplace)', disabled: false },
      { text: 'Free delivery on first 10 orders', disabled: true },
      { text: '24×7 support', disabled: true },
    ],
    buttonText: 'Choose Standard Plan',
  },
  {
    plan: 'Premium Plan',
    price: '2000',
    features: [
      { text: '5 team members', disabled: false },
      { text: 'Top-priority listing on App', disabled: false },
      { text: 'Comprehensive analytics with insights', disabled: false },
      { text: 'Premium logistic support with tracking', disabled: false },
      { text: 'Social media promotion (Facebook & Instagram)', disabled: false },
      { text: 'Free delivery on all orders', disabled: false },
      { text: '24×7 premium support with dedicated manager', disabled: false },
    ],
    buttonText: 'Choose Premium Plan',
  },
];


const Plans = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-green-300 to-green-500 p-8">
      <h1 className="text-4xl font-bold text-center text-green-900 mb-12">Choose Your Plan</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {plansData.map((plan, index) => (
          <LoyaltyCard
            key={index}
            plan={plan.plan}
            price={plan.price}
            features={plan.features}
            buttonText={plan.buttonText}
          />
        ))}
      </div>
    </div>
  );
};

export default Plans;
