import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    console.log('Order submitted:', { ...formData, items: cartItems, total: getTotalPrice() });
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="city"
            label="City"
            value={formData.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            name="zipCode"
            label="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="country"
            label="Country"
            value={formData.country}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Total: ${getTotalPrice().toFixed(2)}
      </Typography>
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Place Order
      </Button>
    </form>
  );
}

export default Checkout;