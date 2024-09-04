import React, { useState } from 'react';
import { Typography, Box, Button, Grid, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

// Banner Component
function Banner() {
  return (
    <Box
    component={motion.div}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '400px',
      backgroundImage: 'url(/banner-bg.webp)', // Correct background image syntax
      backgroundSize: 'cover', // Ensure the background covers the entire box
      backgroundPosition: 'center', // Center the background image
      padding: 4,
      textAlign: 'center',
    }}
  >
      <Typography variant="h3" gutterBottom>
        Fresh and Organic Products
      </Typography>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam vitae perspiciatis neque soluta.
      </Typography>
      <Button variant="contained" color="primary" component={motion.button} whileHover={{ scale: 1.1 }}>
        Shop Now
      </Button>
    </Box>
  );
}

// Blogs Component
function Blogs() {
  const blogPosts = [
    {
      user: 'User',
      date: '1st May, 2021',
      title: 'Fresh And Organic Vegetables And Fruits',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Veniam, Expedita.',
    },
    {
      user: 'User',
      date: '1st May, 2021',
      title: 'Fresh And Organic Vegetables And Fruits',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Veniam, Expedita.',
    },
    {
      user: 'User',
      date: '1st May, 2021',
      title: 'Fresh And Organic Vegetables And Fruits',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Veniam, Expedita.',
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Our Blogs
      </Typography>
      <Grid container spacing={4}>
        {blogPosts.map((post, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">{post.user}</Typography>
                  <CalendarTodayIcon sx={{ mx: 2 }} />
                  <Typography variant="body2">{post.date}</Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {post.description}
                </Typography>
                <Button variant="outlined" color="primary">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Categories Component
function Categories() {
  const categories = [
    { img: '/cat-1.png', title: 'Vegetables', discount: 'Upto 45% off' },
    { img: '/cat-2.png', title: 'Fresh Fruits', discount: 'Upto 45% off' },
    { img: '/cat-3.png', title: 'Dairy Products', discount: 'Upto 45% off' },
    { img: '/cat-4.png', title: 'Fresh Meat', discount: 'Upto 45% off' },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product Categories
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category, index) => (
          <Grid item xs={12} md={3} key={index}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }}>
              <CardMedia component="img" height="140" image={category.img} alt={category.title} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {category.discount}
                </Typography>
                <Button variant="outlined" color="primary">
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Features Component
function Features() {
  const features = [
    { img: '/feature-img-1.png', title: 'Fresh and Organic', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit, quis!' },
    { img: '/feature-img-2.png', title: 'Free Delivery', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit, quis!' },
    { img: '/feature-img-3.png', title: 'Easy Payment', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit, quis!' },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Our Features
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card component={motion.div} whileHover={{ scale: 1.05 }}>
              <CardMedia component="img" height="140" image={feature.img} alt={feature.title} />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {feature.description}
                </Typography>
                <Button variant="outlined" color="primary">
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// Reviews Component
function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = [
    { id: 1, imgSrc: '/pic-1.png', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.', name: 'John Doe' },
    { id: 2, imgSrc: '/pic-2.png', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.', name: 'Jane Doe' },
    { id: 3, imgSrc: '/pic-3.png', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.', name: 'Alice' },
    { id: 4, imgSrc: '/pic-4.png', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.', name: 'Bob' },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Customer's Reviews
      </Typography>
      <Box component={motion.div} sx={{ maxWidth: '600px', margin: 'auto' }}>
        <Card component={motion.div} whileHover={{ scale: 1.05 }}>
          <CardContent>
            <Typography variant="body1" gutterBottom>
              {reviews[currentIndex].text}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {reviews[currentIndex].name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <StarIcon color="primary" />
              <StarIcon color="primary" />
              <StarIcon color="primary" />
              <StarIcon color="primary" />
              <StarHalfIcon color="primary" />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button onClick={handlePrev}>‹</Button>
        <Button onClick={handleNext}>›</Button>
      </Box>
    </Box>
  );
}

// Main App Component
export default function Home() {
  return (
    <Box sx={{ fontFamily: 'Arial, sans-serif' }}>
      <Banner />
      <Blogs />
      <Categories />
      <Features />
      <Reviews />
    </Box>
  );
}
