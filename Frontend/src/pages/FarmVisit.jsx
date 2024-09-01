import React from 'react';
import { Card, CardContent, Typography, Button, Grid, CardMedia } from '@mui/material';

const FarmVisit = () => {
  const packages = [
    {
      id: 1,
      name: 'Organic Farm Experience',
      description: 'Explore an organic farm, learn about sustainable farming practices, and pick your own vegetables.',
      image: 'https://source.unsplash.com/random/300x200?farm', // Replace with actual image URL
      dates: 'Available on weekends',
      price: '$50 per person',
    },
    {
      id: 2,
      name: 'Family Farm Day',
      description: 'Bring your family for a day of fun activities, including feeding animals and harvesting crops.',
      image: 'https://source.unsplash.com/random/300x200?agriculture', // Replace with actual image URL
      dates: 'Every Saturday',
      price: '$80 per family',
    },
    {
      id: 3,
      name: 'Farm-to-Table Experience',
      description: 'Enjoy a farm-to-table meal after a guided tour of the farm where the ingredients are sourced.',
      image: 'https://source.unsplash.com/random/300x200?food', // Replace with actual image URL
      dates: 'Sundays at 11 AM',
      price: '$100 per person',
    },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Farm Experience Packages
      </Typography>
      <Grid container spacing={4}>
        {packages.map((pkg) => (
          <Grid item xs={12} md={4} key={pkg.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={pkg.image}
                alt={pkg.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {pkg.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pkg.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: '1rem' }}>
                  Dates: {pkg.dates}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {pkg.price}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: '1rem' }}
                onClick={() => alert(`Booking ${pkg.name}...`)}
              >
                Book Now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FarmVisit;
