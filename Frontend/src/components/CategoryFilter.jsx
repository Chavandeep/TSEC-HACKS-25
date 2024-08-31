import React from 'react';
import { 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Checkbox, 
  FormControlLabel, 
  Rating, 
  Box, 
  Typography 
} from '@mui/material';

function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  availability,
  onAvailabilityChange,
  discount,
  onDiscountChange,
  rating,
  onRatingChange
}) {
  return (
    <Box sx={{ 
      width: { xs: '100%', md: '250px' }, 
      p: 2, 
      borderRight: 1, 
      borderColor: 'divider', 
      height: '100vh', 
      overflowY: 'auto',
      position: { md: 'sticky' }, 
      top: { md: 0 } 
    }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="category-select-label">Product Type</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={selectedCategory}
          label="Product Type"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <MenuItem value="all">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="price-range-label">Price Range</InputLabel>
        <Select
          labelId="price-range-label"
          id="price-range-select"
          value={priceRange}
          label="Price Range"
          onChange={(e) => onPriceRangeChange(e.target.value)}
        >
          <MenuItem value="all">All Prices</MenuItem>
          <MenuItem value="under10">Under $10</MenuItem>
          <MenuItem value="10-50">$10 - $50</MenuItem>
          <MenuItem value="50-100">$50 - $100</MenuItem>
          <MenuItem value="over100">Over $100</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={availability === 'inStock'}
            onChange={(e) => {
              onAvailabilityChange(e.target.checked ? 'inStock' : 'all');
            }}
          />
        }
        label="In Stock Only"
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="discount-label">Discount</InputLabel>
        <Select
          labelId="discount-label"
          id="discount-select"
          value={discount}
          label="Discount"
          onChange={(e) => onDiscountChange(e.target.value)}
        >
          <MenuItem value="noDiscount">No Discount</MenuItem>
          <MenuItem value="10">10% Off</MenuItem>
          <MenuItem value="20">20% Off</MenuItem>
          <MenuItem value="30">30% Off or More</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="rating-label">Rating</InputLabel>
        <Select
          labelId="rating-label"
          id="rating-select"
          value={rating}
          label="Rating"
          onChange={(e) => onRatingChange(e.target.value)}
        >
          <MenuItem value={0}>All Ratings</MenuItem>
          <MenuItem value={1}>
            <Rating value={1} readOnly size="small" /> & Up
          </MenuItem>
          <MenuItem value={2}>
            <Rating value={2} readOnly size="small" /> & Up
          </MenuItem>
          <MenuItem value={3}>
            <Rating value={3} readOnly size="small" /> & Up
          </MenuItem>
          <MenuItem value={4}>
            <Rating value={4} readOnly size="small" /> & Up
          </MenuItem>
          <MenuItem value={5}>
            <Rating value={5} readOnly size="small" />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default CategoryFilter;
