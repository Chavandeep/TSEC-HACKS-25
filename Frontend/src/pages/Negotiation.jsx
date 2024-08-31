import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const demoProducts = [
  { name: 'Apples', marketPrice: 2.5, sellingPrice: 2.8 },
  { name: 'Tomatoes', marketPrice: 1.8, sellingPrice: 2.0 },
  { name: 'Potatoes', marketPrice: 1.2, sellingPrice: 1.5 },
];

const Negotiation = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');

  const addMessage = (sender, content, type = 'text') => {
    setMessages([...messages, { sender, content, type }]);
  };

  const handleSend = () => {
    if (inputMessage.trim()) {
      addMessage('Retailer', inputMessage);
      setInputMessage('');
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    addMessage('System', `Selected product: ${product.name}`, 'product');
  };

  const handleOffer = (type) => {
    if (offerAmount && selectedProduct) {
      addMessage('Retailer', `${type}: $${offerAmount} for ${selectedProduct.name}`, 'offer');
      setOfferAmount('');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', p: 2 }}>
      <Paper elevation={3} sx={{ flex: 1, p: 2, mr: 2, overflowY: 'auto' }}>
        <Typography variant="h5" gutterBottom>Chat</Typography>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText 
                primary={`${msg.sender}: ${msg.content}`}
                secondary={msg.type === 'product' ? `Market Price: $${selectedProduct.marketPrice}, Selling Price: $${selectedProduct.sellingPrice}` : null}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message"
          />
          <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>Send</Button>
        </Box>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <TextField
            variant="outlined"
            type="number"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            placeholder="Offer amount"
            sx={{ mr: 1 }}
          />
          <Button variant="contained" color="primary" onClick={() => handleOffer('Offer')} sx={{ mr: 1 }}>Offer</Button>
          <Button variant="contained" color="secondary" onClick={() => handleOffer('Counteroffer')} sx={{ mr: 1 }}>Counteroffer</Button>
          <Button variant="contained" color="error" onClick={() => addMessage('Retailer', 'Offer rejected')}>Reject</Button>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ width: 300, p: 2, overflowY: 'auto' }}>
        <Typography variant="h6" gutterBottom>Products</Typography>
        <List>
          {demoProducts.map((product, index) => (
            <ListItem key={index} button onClick={() => handleProductSelect(product)}>
              <ListItemText primary={product.name} secondary={`Market: $${product.marketPrice}, Selling: $${product.sellingPrice}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Negotiation;