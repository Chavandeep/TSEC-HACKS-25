import React, { useState, useEffect } from 'react';
import { Button, TextField, Paper, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig'; // Adjust the path as necessary

const Negochat = ({ currentFarmerId = 'cZFdt8VQGFVXalPaEpSQGcLrL542', currentCustomerId = '0kqgYSJUdQcTax4fpliYuS7clhw2' }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [offerAmount, setOfferAmount] = useState('');
  const [userType, setUserType] = useState('');

  // Dummy products for the right panel
  const demoProducts = [
    { name: 'Apples', marketPrice: 100, sellingPrice: 90 },
    { name: 'Bananas', marketPrice: 50, sellingPrice: 45 },
    { name: 'Carrots', marketPrice: 80, sellingPrice: 70 },
  ];

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const userDocRef = doc(db, 'userDetails', currentFarmerId); // Change to currentUserId if different
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserType(userDoc.data().userType); // Assuming userType is stored in userDetails         
        }
        console.log(userType)
      } catch (error) {
        console.error('Error fetching user type:', error);
      }
    };

    fetchUserType();
  }, [currentFarmerId]);

  useEffect(() => {
    const chatDocRef = doc(db, 'Chats', `${currentFarmerId}_${currentCustomerId}`);
    const unsubscribe = onSnapshot(chatDocRef, (doc) => {
      if (doc.exists()) {
        const chatData = doc.data();
        setMessages([...chatData.farmerMessages, ...chatData.customerMessages]);
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [currentFarmerId, currentCustomerId]);

  const addMessage = async (sender, content, type = 'text') => {
    const newMessage = { sender, content, type, timestamp: new Date().toISOString() };
    const chatDocRef = doc(db, 'Chats', `${currentFarmerId}_${currentCustomerId}`);

    const chatDoc = await getDoc(chatDocRef);
    if (chatDoc.exists()) {
      const chatData = chatDoc.data();
      const updatedMessages = sender === 'Farmer' ? [...chatData.farmerMessages, newMessage] : [...chatData.customerMessages, newMessage];
      await updateDoc(chatDocRef, {
        [sender === 'Farmer' ? 'farmerMessages' : 'customerMessages']: updatedMessages
      });
    } else {
      await setDoc(chatDocRef, {
        farmer_id: currentFarmerId,
        customer_id: currentCustomerId,
        farmerMessages: sender === 'Farmer' ? [newMessage] : [],
        customerMessages: sender === 'Customer' ? [newMessage] : []
      });
    }
  };

  const handleSend = () => {
    if (inputMessage.trim()) {
      if (userType) {
        addMessage(userType === 'Farmer' ? 'Customer' : 'Retailer', inputMessage);
        setInputMessage('');
      } else {
        console.error('User type is not available.');
      }
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    addMessage('System', `Selected product: ${product.name}`, 'product');
  };

  const handleOffer = async (type) => {
    if (offerAmount && selectedProduct) {
      await addMessage(userType === 'Farmer' ? 'Customer' : 'Retailer', `${type}: $${offerAmount} for ${selectedProduct.name}`, 'offer');
      setOfferAmount('');
    }
  };

  const handleReject = async () => {
    if (selectedProduct) {
      await addMessage(userType === 'Farmer' ? 'Farmer' : 'Retailer', `Offer rejected for ${selectedProduct.name}`, 'reject');
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
                secondary={msg.type === 'product' ? `Market Price: $${selectedProduct?.marketPrice}, Selling Price: $${selectedProduct?.sellingPrice}` : null}
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
          <Button variant="contained" color="error" onClick={handleReject}>Reject</Button>
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

export default Negochat;
