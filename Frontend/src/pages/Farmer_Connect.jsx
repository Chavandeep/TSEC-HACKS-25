import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Card, CardContent, CardMedia, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import { collection, getDocs, query, where, doc, setDoc, Timestamp, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../Firebase/firebaseConfig'; 

const FarmerConnect = () => {
  const [farmers, setFarmers] = useState([]);
  const [searchProduce, setSearchProduce] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [produceType, setProduceType] = useState('All Types');
  const [connectionStatus, setConnectionStatus] = useState({}); // To track connection status

  // Fetch farmers from Firestore
  useEffect(() => {
    const fetchFarmers = async () => {
      const farmersRef = collection(db, 'userDetails');
      const q = query(farmersRef, where('userType', '==', 'Farmer'));
      const querySnapshot = await getDocs(q);
      
      const farmersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFarmers(farmersList);
    };

    fetchFarmers();
  }, []);

  // Check existing connections for the current user
  useEffect(() => {
    const fetchConnections = () => {
      const buyerId = auth.currentUser.uid;
      if (!buyerId) return;

      const connectionsRef = collection(db, 'connections');
      const q = query(connectionsRef, where('buyerId', '==', buyerId));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const status = {};
        snapshot.docs.forEach(doc => {
          const data = doc.data();
          status[data.farmerId] = data.status;
        });
        setConnectionStatus(status);
      });

      return () => unsubscribe();
    };

    fetchConnections();
  }, []);

  // Function to handle connection request
  const handleConnect = async (farmerId) => {
    const buyerId = auth.currentUser.uid; // Assuming buyer is logged in and `userType` is 'buyer'
    
    if (!buyerId || !farmerId) {
      console.error("buyerId or farmerId is not defined");
      return;
    }
  
    if (buyerId === farmerId) {
      alert('You cannot send a connection request to yourself.');
      return;
    }
  
    try {
      const connectionRef = doc(db, 'connections', `${buyerId}_${farmerId}`); // Use buyerId_farmersId for unique document ID
      await setDoc(connectionRef, {
        farmerId,
        buyerId,
        status: 'pending', // Status can be 'pending', 'accepted', or 'rejected'
        timestamp: Timestamp.now(),
      });
      alert('Connection request sent!');
    } catch (error) {
      console.error("Error sending connection request: ", error);
    }
  };
  
  // Filter farmers based on search and selected options
  const filteredFarmers = farmers.filter(farmer => {
    const matchesProduce = searchProduce === '' || 
      [farmer.crops, farmer.fruits, farmer.vegetables].flat().join(', ').toLowerCase().includes(searchProduce.toLowerCase());
    const matchesLocation = location === 'All Locations' || farmer.state === location;
    const matchesProduceType = produceType === 'All Types' || 
      (produceType === 'fruits' && farmer.fruits.length > 0) ||
      (produceType === 'vegetables' && farmer.vegetables.length > 0) ||
      (produceType === 'grains' && farmer.crops.includes('grains'));
    return matchesProduce && matchesLocation && matchesProduceType;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Farmers Selling to Retailers
      </Typography>

      {/* Filters Section */}
      <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <TextField
          label="Search Produce"
          variant="outlined"
          size="small"
          value={searchProduce}
          onChange={(e) => setSearchProduce(e.target.value)}
        />
        <Select
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          size="small"
          sx={{ minWidth: '100px' }}
        >
          <MenuItem value="All Locations">All Locations</MenuItem>
          <MenuItem value="north">North</MenuItem>
          <MenuItem value="south">South</MenuItem>
          <MenuItem value="east">East</MenuItem>
          <MenuItem value="west">West</MenuItem>
        </Select>
        <Select
          label="Produce Type"
          value={produceType}
          onChange={(e) => setProduceType(e.target.value)}
          size="small"
        >
          <MenuItem value="All Types">All Types</MenuItem>
          <MenuItem value="fruits">Fruits</MenuItem>
          <MenuItem value="vegetables">Vegetables</MenuItem>
          <MenuItem value="grains">Grains</MenuItem>
        </Select>
        <Button variant="contained" color="primary" size="large">
          Search
        </Button>
      </Box>

      {/* List of Farmers */}
      <Grid container spacing={4}>
        {filteredFarmers.map(farmer => (
          <Grid item xs={12} sm={6} md={4} key={farmer.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={farmer.profilePicUrl || 'https://via.placeholder.com/300x140'} // Use farmer's profile picture or a placeholder
                alt={farmer.name || 'Farmer’s produce'}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {farmer.name}
                </Typography>
                <Typography color="textSecondary">
                  Location: {farmer.state}
                </Typography>
                <Typography variant="body2" paragraph>
                  Crops: {farmer.crops.join(', ')}<br />
                  Fruits: {farmer.fruits.join(', ')}<br />
                  Vegetables: {farmer.vegetables.join(', ')}
                </Typography>
                <Button
                  variant="contained"
                  color={connectionStatus[farmer.id] === 'pending' ? 'warning' : 'success'}
                  fullWidth
                  onClick={() => handleConnect(farmer.id)}
                >
                  {connectionStatus[farmer.id] === 'pending' ? 'Request Sent' : 'Connect'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FarmerConnect;
