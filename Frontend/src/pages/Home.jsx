import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import ProductList from '../components/ProductList';
import SearchBar from '../components/Searchbar';
import CategoryFilter from '../components/CategoryFilter';
import { getProducts } from '../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [productName, setProductName] = useState('');
  const [availability, setAvailability] = useState('all');
  const [discount, setDiscount] = useState('noDiscount');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
      setCategories([...new Set(data.map(product => product.category))]);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, priceRange, productName, availability, discount, rating]);

  const handleSearch = (query) => {
    setProductName(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const handleAvailabilityChange = (status) => {
    setAvailability(status);
  };

  const handleDiscountChange = (discount) => {
    setDiscount(discount);
  };

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (priceRange !== 'all') {
      if (priceRange === 'under10') {
        filtered = filtered.filter(product => product.price < 10);
      } else if (priceRange === 'over100') {
        filtered = filtered.filter(product => product.price > 100);
      } else {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter(product =>
          product.price >= (min || 0) && product.price <= (max || Infinity)
        );
      }
    }

    if (productName) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(productName.toLowerCase())
      );
    }

    if (availability === 'inStock') {
      filtered = filtered.filter(product => product.inStock );
    }

    if (discount !== 'noDiscount') {
      const discountValue = parseInt(discount, 10);
      filtered = filtered.filter(product => product.discount >= discountValue);
    }

    if (rating > 0) {
      filtered = filtered.filter(product => product.rating >= rating);
    }

    setFilteredProducts(filtered);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome to Our Store</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ position: 'sticky', top: 0 }}>
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
              availability={availability}
              onAvailabilityChange={handleAvailabilityChange}
              discount={discount}
              onDiscountChange={handleDiscountChange}
              rating={rating}
              onRatingChange={handleRatingChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <SearchBar onSearch={handleSearch} />
          <ProductList products={filteredProducts} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
