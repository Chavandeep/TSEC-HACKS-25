import React from 'react';
import { Container } from '@mui/material';
import Checkout from '../components/Checkout';

function CheckoutPage() {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Checkout />
    </Container>
  );
}

export default CheckoutPage;