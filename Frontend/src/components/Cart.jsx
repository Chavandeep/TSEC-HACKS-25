import React from 'react';
import { 
  List, Typography, Button, Paper, Box, Divider
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

function Cart() {
  const { cartItems, getTotalPrice } = useCart();
  console.log(getTotalPrice())

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <ShoppingCartIcon sx={{ mr: 2 }} />
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6">Your cart is empty.</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/" 
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <>
          <List sx={{ mb: 2 }}>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">Total:</Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              ${getTotalPrice()}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              color="primary" 
              component={Link} 
              to="/"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/checkout"
              startIcon={<ShoppingCartIcon />}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}

export default Cart;
