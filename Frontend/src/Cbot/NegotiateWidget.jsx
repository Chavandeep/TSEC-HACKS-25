import React, { useState } from 'react';

const NegotiateWidget = ({ actions }) => {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');

  const handleProductChange = (e) => {
    setProduct(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = () => {
    actions.handleNegotiation(product, price);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter product name"
        value={product}
        onChange={handleProductChange}
      />
      <input
        type="number"
        placeholder="Enter your price"
        value={price}
        onChange={handlePriceChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NegotiateWidget;
