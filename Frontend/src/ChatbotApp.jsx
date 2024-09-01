import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const ChatbotApp = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = 'AIzaSyAvMC985T8ANLe-ENJ9zs4y0J3CFqnr6WE'; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() => {
    if (isChatbotOpen) {
      if (messages.length === 0) {
        setMessages([{ text: 'Hello! How can I assist you today?', sender: 'bot' }]);
      }
      scrollToBottom();
    }
  }, [isChatbotOpen]); // Only re-run this effect when isChatbotOpen changes

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      setMessages((prevMessages) => [
        ...prevMessages,
        { text, sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Bot Icon */}
      <div onClick={toggleChatbot} className="fixed bottom-4 right-4 cursor-pointer">
        <img src="/NutriBot.png" alt="Bot" className="w-20 h-20 rounded-full shadow-lg" />
      </div>

      {/* Chatbox */}
      {isChatbotOpen && (
        <div className="fixed bottom-24 right-4 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col transform transition-transform duration-300 ease-in-out translate-y-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatbotApp;
