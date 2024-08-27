import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lowercaseMessage = message.toLowerCase();

    // Define categories and their related keywords
    const categories = {
      greeting: ['hello', 'hi', 'hey', 'greetings'],
      pricing: ['price', 'cost', 'how much', 'discount'],
      availability: ['available', 'in stock', 'when can i get'],
      order: ['order', 'buy', 'purchase'],
      delivery: ['deliver', 'shipping', 'send'],
      productInfo: ['details', 'information', 'specs', 'tell me about'],
      customerSupport: ['help', 'support', 'issue', 'problem'],
      feedback: ['feedback', 'review', 'rate'],
      farmingAdvice: ['grow', 'cultivate', 'pest', 'soil', 'harvest'],
      weatherInfo: ['weather', 'forecast', 'rain', 'temperature'],
      marketPrices: ['market price', 'selling price', 'commodity prices'],
      cropPlanning: ['crop rotation', 'planting schedule', 'what to plant'],
      farewell: ['bye', 'goodbye', 'see you', 'thanks']
    };

    // Check if message matches any category
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
        return actions.handleCategory(category, message);
      }
    }

    // Check for product names or specific crops
    const products = ['tomato', 'potato', 'corn', 'wheat', 'rice']; // Add more as needed
    for (const product of products) {
      if (lowercaseMessage.includes(product)) {
        return actions.handleProductQuery(product, message);
      }
    }

    // Handle numbers for potential quantities or prices
    const numbers = message.match(/\d+/);
    if (numbers) {
      return actions.handleNumberInput(numbers[0], message);
    }

    // If no category or product is matched, treat as an open-ended question
    return actions.handleOpenQuestion(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;