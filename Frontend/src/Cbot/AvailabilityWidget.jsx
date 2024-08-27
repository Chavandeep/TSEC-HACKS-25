import React, { useState } from 'react';

const AvailabilityWidget = ({ actions }) => {
  const [product, setProduct] = useState('');

  const handleProductChange = (e) => {
    setProduct(e.target.value);
  };

  const handleSubmit = () => {
    actions.handleProductQuery(product);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter product name"
        value={product}
        onChange={handleProductChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AvailabilityWidget;
