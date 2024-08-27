import React from 'react';
import PriceWidget from './PriceWidget';
import AvailabilityWidget from './AvailabilityWidget';
import NegotiateWidget from './NegotiateWidget';
import OrderWidget from './OrderWidget';
import FeedbackWidget from './FeedbackWidget';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const addMessageToState = (botMessage) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleProductQuery = (product) => {
    const botMessage = createChatBotMessage(`You asked about ${product}. I will check the details for you.`);
    addMessageToState(botMessage);
  };

  const handleNegotiation = (product, price) => {
    const botMessage = createChatBotMessage(`Negotiating ${product} at ${price}. Let’s see what we can do.`);
    addMessageToState(botMessage);
  };

  const handleOrder = (product, quantity) => {
    const botMessage = createChatBotMessage(`Order received for ${quantity} of ${product}. I will process it.`);
    addMessageToState(botMessage);
  };

  const handleFeedback = (feedback) => {
    const botMessage = createChatBotMessage(`Thank you for your feedback: "${feedback}". We appreciate it.`);
    addMessageToState(botMessage);
  };

  const handleOptionSelection = (option) => {
    let botMessage;
    switch (option) {
      case 'price':
        botMessage = createChatBotMessage("Which product's price would you like to know?", {
          widget: 'priceWidget',
        });
        break;
      case 'availability':
        botMessage = createChatBotMessage("Which product's availability are you interested in?", {
          widget: 'availabilityWidget',
        });
        break;
      case 'negotiate':
        botMessage = createChatBotMessage("I'd be happy to discuss pricing. What product are you interested in negotiating?", {
          widget: 'negotiateWidget',
        });
        break;
      case 'order':
        botMessage = createChatBotMessage("Great! What would you like to order?", {
          widget: 'orderWidget',
        });
        break;
      case 'delivery':
        botMessage = createChatBotMessage("I can help with delivery information. Is this for an existing order or are you asking about general delivery options?");
        break;
      case 'feedback':
        botMessage = createChatBotMessage("We appreciate your feedback! What would you like to share with us?", {
          widget: 'feedbackWidget',
        });
        break;
      case 'faq':
        botMessage = createChatBotMessage("I'd be happy to answer frequently asked questions. What topic are you curious about?");
        break;
      case 'subscription':
        botMessage = createChatBotMessage("I can help you with subscription information. Are you interested in starting a new subscription or managing an existing one?");
        break;
      case 'education':
        botMessage = createChatBotMessage("I'd be glad to provide educational resources. What topic would you like to learn more about?");
        break;
      case 'thank':
        botMessage = createChatBotMessage("You're welcome! I'm glad I could assist you. Is there anything else you need help with?");
        break;
      case 'goodbye':
        botMessage = createChatBotMessage("Thank you for chatting with me! If you need any more assistance in the future, don't hesitate to ask. Have a great day!");
        break;
      default:
        botMessage = createChatBotMessage("I'm not sure I understand that option. Could you please clarify or choose another option?");
    }
    addMessageToState(botMessage);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleOptionSelection,
            handleProductQuery,
            handleNegotiation,
            handleOrder,
            handleFeedback,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
