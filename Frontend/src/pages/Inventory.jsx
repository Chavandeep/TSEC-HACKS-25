import React, { useState, useEffect } from 'react';
import { 
  Grid, Card, CardContent, CardActions, TextField, Select, MenuItem, FormControl,
  InputLabel, Button, Typography, Box, CardMedia
} from '@mui/material';

// Dummy data
const dummyProducts = [
  { id: 1, name: "Apples", category: "fruits", price: 1.99, quantity: 100, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Carrots", category: "vegetables", price: 0.99, quantity: 200, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Wheat", category: "grains", price: 2.49, quantity: 50, image: "https://via.placeholder.com/150" },
  { id: 4, name: "Strawberries", category: "fruits", price: 3.99, quantity: 75, image: "https://via.placeholder.com/150" },
  { id: 5, name: "Potatoes", category: "vegetables", price: 1.49, quantity: 150, image: "https://via.placeholder.com/150" },
];

const Inventory = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [filteredProducts, setFilteredProducts] = useState(dummyProducts);
  const [nameFilter, setNameFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    applyFilters();
  }, [products, nameFilter, categoryFilter, sortBy]);

  const applyFilters = () => {
    let filtered = [...products];

    if (nameFilter) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(product => 
        product.category === categoryFilter
      );
    }

    filtered.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

    setFilteredProducts(filtered);
  };

  return (
    <Box sx={{ p: 4,marginLeft:'300px' }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Filter by name"
          variant="outlined"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          sx={{ width: 200 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="fruits">Fruits</MenuItem>
            <MenuItem value="vegetables">Vegetables</MenuItem>
            <MenuItem value="grains">Grains</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortBy}
            label="Sort by"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="quantity">Quantity</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth:'100%' }}>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 150, height: 150, objectFit: 'cover' }}
                  image={product.image}
                  alt={product.name}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {product.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small" color="error">Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Inventory;