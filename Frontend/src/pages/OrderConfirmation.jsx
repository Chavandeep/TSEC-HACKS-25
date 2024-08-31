import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function OrderConfirmation() {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Thank You for Your Order!</Typography>
      <Typography variant="body1" paragraph>
        Your order has been successfully placed. We'll send you an email with the order details and tracking information.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Continue Shopping
      </Button>
    </Container>
  );
}

export default OrderConfirmation;