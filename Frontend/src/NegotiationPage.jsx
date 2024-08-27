import React from 'react';
import { useParams } from 'react-router-dom';
import ChatInterface from './ChatInterface';

const NegotiationPage = () => {
  const { farmerId } = useParams();
  const customerId = 'customer-123'; // Replace with actual customer ID

  return (
    <ChatInterface farmerId={farmerId} customerId={customerId} />
  );
};

export default NegotiationPage;
