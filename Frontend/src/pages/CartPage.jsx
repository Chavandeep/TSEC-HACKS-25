import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart';

function CartPage() {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography variant="h4" gutterBottom>Your Shopping Cart</Typography>
      <Cart />
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to="/" 
        style={{ marginTop: '2rem' }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}

export default CartPage;