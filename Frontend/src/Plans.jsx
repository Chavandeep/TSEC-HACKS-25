import React from 'react';
import LoyaltyCard from './LoyaltyCard'; // Adjust the import path as needed

const plansData = [
  {
    plan: 'Basic Plan',
    price: '200',
    features: [
      { text: '1 team member', disabled: false },
      { text: '10GB Cloud storage', disabled: false },
      { text: 'Integration help', disabled: false },
      { text: 'Sketch Files', disabled: true },
      { text: 'API Access', disabled: true },
      { text: 'Complete documentation', disabled: true },
      { text: '24×7 phone & email support', disabled: true },
    ],
    buttonText: 'Choose Basic Plan',
  },
  {
    plan: 'Standard Plan',
    price: '500',
    features: [
      { text: '2 team members', disabled: false },
      { text: '20GB Cloud storage', disabled: false },
      { text: 'Integration help', disabled: false },
      { text: 'Sketch Files', disabled: false },
      { text: 'API Access', disabled: true },
      { text: 'Complete documentation', disabled: true },
      { text: '24×7 phone & email support', disabled: true },
    ],
    buttonText: 'Choose Standard Plan',
  },
  {
    plan: 'Premium Plan',
    price: '1000',
    features: [
      { text: '5 team members', disabled: false },
      { text: '50GB Cloud storage', disabled: false },
      { text: 'Integration help', disabled: false },
      { text: 'Sketch Files', disabled: false },
      { text: 'API Access', disabled: false },
      { text: 'Complete documentation', disabled: false },
      { text: '24×7 phone & email support', disabled: false },
    ],
    buttonText: 'Choose Premium Plan',
  },
];

const Plans = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 via-green-500 to-green-600 p-8">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-8">Choose Your Plan</h1>
      <div className="flex flex-wrap justify-center gap-8">
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
