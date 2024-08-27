import React, { useState, useEffect, useRef } from 'react';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(1000); // Initial offer
  const [negotiationStage, setNegotiationStage] = useState(0);
  const messagesEndRef = useRef(null);

  const stages = [
    "Initial Offer",
    "First Negotiation",
    "Second Negotiation",
    "Final Offer"
  ];

  useEffect(() => {
    // Simulate farmer's initial offer
    setMessages([{ role: 'farmer', text: `I offer $${currentOffer} for the crop.` }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAction = (action) => {
    let newMessage = '';
    switch(action) {
      case 'ACCEPT':
        newMessage = 'I accept your offer.';
        break;
      case 'REJECT':
        newMessage = 'I reject your offer.';
        break;
      case 'COUNTEROFFER':
        newMessage = `I counter with $${message}.`;
        break;
      default:
        return;
    }

    setMessages([...messages, { role: 'customer', text: newMessage }]);
    setMessage('');

    if (action === 'ACCEPT' || action === 'REJECT') {
      setNegotiationStage(stages.length - 1); // End negotiation
    } else if (action === 'COUNTEROFFER') {
      const counterOffer = parseFloat(message);
      setCurrentOffer(counterOffer);

      // Simulate farmer's response
      setTimeout(() => {
        let farmerResponse;
        if (negotiationStage < stages.length - 2) {
          const newOffer = Math.round((currentOffer + counterOffer) / 2);
          farmerResponse = `How about we meet in the middle at $${newOffer}?`;
          setCurrentOffer(newOffer);
          setNegotiationStage(negotiationStage + 1);
        } else {
          farmerResponse = "This is my final offer. Do you accept?";
          setNegotiationStage(stages.length - 1);
        }
        setMessages(prev => [...prev, { role: 'farmer', text: farmerResponse }]);
      }, 1000);
    }
  };

  const handleInputChange = (e) => setMessage(e.target.value);

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-2 text-center">Crop Price Negotiation</h2>
      <div className="text-sm mb-2 text-center text-gray-600">Stage: {stages[negotiationStage]}</div>
      <div className="flex-1 overflow-auto p-4 bg-white rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg max-w-[70%] ${
              msg.role === 'farmer' 
                ? 'bg-green-100 text-green-800 self-start' 
                : 'bg-blue-100 text-blue-800 self-end ml-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4">
        <div className="flex space-x-2 mb-2">
          <input
            type="number"
            value={message}
            onChange={handleInputChange}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter your offer"
          />
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            onClick={() => handleAction('COUNTEROFFER')}
          >
            Offer
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            onClick={() => handleAction('ACCEPT')}
          >
            ACCEPT
          </button>
          <button
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => handleAction('REJECT')}
          >
            REJECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;