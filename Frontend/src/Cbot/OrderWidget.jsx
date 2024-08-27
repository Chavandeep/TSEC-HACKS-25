import React, { useState } from 'react';

const OrderWidget = ({ actions }) => {
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleProductChange = (e) => {
    setProduct(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = () => {
    actions.handleOrder(product, quantity);
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
        placeholder="Enter quantity"
        value={quantity}
        onChange={handleQuantityChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default OrderWidget;
