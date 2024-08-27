import React from 'react';

const OptionsWidget = (props) => {
  const options = [
    'price',
    'availability',
    'negotiate',
    'order',
    'delivery',
    'feedback',
    'faq',
    'subscription',
    'education',
    'thank',
    'goodbye'
  ];

  return (
    <div>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => props.actions.handleOptionSelection(option)}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default OptionsWidget;
