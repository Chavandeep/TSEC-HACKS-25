import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../Firebase/firebaseConfig'; 

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = () => {
      const farmerId = auth.currentUser.uid;
      if (!farmerId) return;

      const connectionsRef = collection(db, 'connections');
      const q = query(connectionsRef, where('farmerId', '==', farmerId), where('status', '==', 'pending'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const requests = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(requests);
      });

      return () => unsubscribe();
    };

    fetchNotifications();
  }, []);

  const handleResponse = async (requestId, response) => {
    try {
      const connectionRef = doc(db, 'connections', requestId);
      await updateDoc(connectionRef, {
        status: response,
        responseTimestamp: Timestamp.now(),
      });
      alert(`Request ${response}!`);
    } catch (error) {
      console.error("Error updating connection status: ", error);
    }
  };

  return (
    <Box sx={{ mt: 5 ,position:'relative' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Connection Requests
      </Typography>
      <Grid container spacing={3}>
        {notifications.map((request) => (
          <Grid item xs={12} sm={6} md={4} key={request.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Request from Buyer
                </Typography>
                <Typography variant="body2">
                  Buyer ID: {request.buyerId}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleResponse(request.id, 'accepted')}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleResponse(request.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Notifications;
