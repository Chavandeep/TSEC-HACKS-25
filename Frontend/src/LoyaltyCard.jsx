import React from 'react';

const LoyaltyCard = ({ plan, price, features, buttonText }) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-green-200 rounded-lg shadow-lg dark:bg-green-600 dark:border-gray-700 transition-transform transform hover:scale-105">
      <h5 className="mb-4 text-2xl font-semibold text-green-600 dark:text-green-400">{plan}</h5>
      <div className="flex items-baseline text-gray-900 dark:text-white mb-6">
        <span className="text-4xl font-bold text-green-700 dark:text-white">₹</span>
        <span className="text-6xl font-extrabold text-green-800 dark:text-white">{price}</span>
        <span className="text-xl font-normal text-gray-500 dark:text-white">/month</span>
      </div>
      <ul role="list" className="my-7 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center ${feature.disabled ? 'line-through text-gray-500 dark:text-gray-400' : 'text-green-700 dark:text-green-300'}`}>
            <svg className={`w-5 h-5 ${feature.disabled ? 'text-gray-400 dark:text-gray-500' : 'text-green-700 dark:text-green-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span className="ms-3 text-base font-medium leading-tight">{feature.text}</span>
          </li>
        ))}
      </ul>
      <button
  type="button"
  className="mt-8 inline-flex items-center justify-center rounded-xl bg-green-200 text-grey-400 py-3 px-6 font-medium text-base shadow-lg shadow-green-500/50 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
>
  {buttonText}
</button>


    </div>
  );
};

export default LoyaltyCard;
