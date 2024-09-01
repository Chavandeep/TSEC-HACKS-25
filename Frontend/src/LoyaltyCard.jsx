import React from 'react';

const LoyaltyCard = ({ plan, price, features, buttonText }) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105">
      <h5 className="mb-4 text-3xl font-bold text-green-700 dark:text-green-300">{plan}</h5>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">₹</span>
        <span className="text-6xl font-extrabold text-green-700 dark:text-green-300">{price}</span>
        <span className="text-xl font-medium text-gray-500 dark:text-gray-400">/month</span>
      </div>
      <ul role="list" className="my-7 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center ${feature.disabled ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
            <svg className={`w-6 h-6 ${feature.disabled ? 'text-gray-400 dark:text-gray-500' : 'text-green-700 dark:text-green-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span className="ml-3 text-lg font-medium">{feature.text}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-8 w-full rounded-lg bg-green-700 text-white py-3 px-6 font-medium text-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default LoyaltyCard;
