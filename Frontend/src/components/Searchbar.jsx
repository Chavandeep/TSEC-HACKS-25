import React, { useState, useEffect } from 'react';
import { InputBase, IconButton, Paper, Fade } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Debounce function to limit the rate of API calls
    const debounceSearch = setTimeout(() => {
      onSearch(query);
    }, 300); // Wait for 300ms after the user stops typing

    return () => clearTimeout(debounceSearch);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <Paper
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        backgroundColor: isFocused ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.15)',
        transition: 'background-color 0.3s',
        borderRadius: 2,
        boxShadow: isFocused ? '0 0 0 3px #4CAF50' : '0 0 0 2px #4CAF50',
      }}
    >
      <IconButton sx={{ p: '10px', color: 'inherit' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, color: 'inherit' }}
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        inputProps={{ 'aria-label': 'search products' }}
      />
      <Fade in={query.length > 0}>
        <IconButton 
          onClick={handleClear}
          sx={{ 
            visibility: query.length > 0 ? 'visible' : 'hidden',
            color: 'inherit'
          }}
        >
          <ClearIcon />
        </IconButton>
      </Fade>
    </Paper>
  );
}

export default SearchBar;