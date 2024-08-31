import React from 'react';
import { 
  Card, CardMedia, CardContent, Typography, IconButton, Box, 
  Chip, Rating, Stack
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VisibilityIcon from '@mui/icons-material/Visibility';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  // Calculate discount if needed
  const discount = ((product.marketPrice - product.productPrice) / product.marketPrice) * 100;

  return (
    <Card 
      sx={{ 
        width: 280, 
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        borderRadius: 0,
        '&:hover': { 
          transform: 'scale(1.03)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)',
        },
      }}
    >
      <CardMedia
        component="img"
        image={product.productPicURL}
        alt={product.productName}
        sx={{objectFit:'cover',objectPosition:'center',maxHeight:'180px',minHeight:'180px'}}
      />
      <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 1 }}>
          {product.productName}
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              ${Number(product.productPrice).toFixed(2)}
            </Typography>
            {discount > 0 && (
              <Chip 
                icon={<LocalOfferIcon sx={{ fontSize: '0.8rem' }} />} 
                label={`${discount.toFixed(1)}% OFF`} 
                color="secondary" 
                size="small" 
                sx={{ fontSize: '0.7rem' }}
              />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, flexGrow: 1 }}>
            {product.description && product.description.length > 60 
              ? `${product.description.substring(0, 60)}...` 
              : product.description || "No description available"}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating || 0} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({(product.rating || 0).toFixed(1)})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton 
              component={Link} 
              to={`/product/${product.productName}`} // Use product name or unique ID
              size="small"
              sx={{ color: 'primary.main' }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton 
              onClick={() => addToCart(product, 1)}
              size="small"
              sx={{ 
                color: 'primary.main',
                '&:disabled': { color: 'grey.500' }
              }}
            >
              <ShoppingCartIcon />
            </IconButton>

          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
