import React from 'react';
import { 
  ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, 
  Typography, Box, Chip, Button, Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../hooks/useCart';

function CartItem({ item }) {
  const { updateCartItemQuantity, removeFromCart } = useCart();

  const discountedPrice = item.discount 
    ? item.price * (1 - item.discount / 100) 
    : item.price;

  return (
    <ListItem 
      alignItems="flex-start" 
      sx={{ 
        mb: 2, 
        backgroundColor: '#f5f5f5', 
        borderRadius: 2,
        p: 2,
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={2}>
          <ListItemAvatar>
            <Avatar 
              src={item.image} 
              alt={item.name} 
              variant="rounded"
              sx={{ width: 80, height: 80 }}
            />
          </ListItemAvatar>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListItemText
            primary={
              <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                {item.name}
                {item.discount > 0 && (
                  <Chip 
                    label={`${item.discount}% OFF`} 
                    color="secondary" 
                    size="small" 
                    sx={{ ml: 1 }}
                  />
                )}
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {item.description}
                </Typography>
                <Typography component="span" variant="body1" color="text.primary">
                  ${discountedPrice.toFixed(2)} x {item.quantity}
                </Typography>
              </React.Fragment>
            }
          />
        </Grid>
        <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
          <Typography component="span" variant="body1" color="primary" fontWeight="bold">
            ${(discountedPrice * item.quantity).toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <IconButton 
                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                size="small"
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
              <IconButton 
                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                size="small"
              >
                <AddIcon />
              </IconButton>
            </Box>
            <IconButton 
              aria-label="delete" 
              onClick={() => removeFromCart(item.id)}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default CartItem;