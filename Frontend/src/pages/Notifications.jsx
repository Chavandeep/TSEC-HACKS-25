import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { collection, query, where, onSnapshot, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../Firebase/firebaseConfig';

const Notifications = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const currentUserId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUserType = async () => {
      if (!currentUserId) return;
      
      try {
        const userDocRef = doc(db, 'userDetails', currentUserId);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        if (userData) {
          setUserType(userData.userType);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user type: ", error);
      }
    };

    fetchUserType();
  }, [currentUserId]);

  useEffect(() => {
    const fetchRequests = () => {
      if (!currentUserId || userType === null) return;

      let q;
      const connectionsRef = collection(db, 'connections');
      if (userType === 'Farmer') {
        q = query(connectionsRef, where('farmerId', '==', currentUserId), where('status', '==', 'pending'));
      } else if (userType === 'Retailer' || userType === 'Customer') {
        q = query(connectionsRef, where('buyerId', '==', currentUserId), where('status', '==', 'pending'));
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const requestsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestsList);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    fetchRequests();
  }, [userType, currentUserId]);

  const handleResponse = async (requestId, response) => {
    try {
      const requestRef = doc(db, 'connections', requestId);
      await updateDoc(requestRef, { status: response });
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === requestId ? { ...request, status: response } : request
        )
      );
      alert(`Request ${response}!`);
    } catch (error) {
      console.error(`Error updating connection status to ${response}: `, error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Connection Requests
      </Typography>
      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : (
        <Grid container spacing={3}>
          {requests.length > 0 ? (
            requests.map(request => (
              <Grid item xs={12} sm={6} md={4} key={request.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Request from {request.buyerId}
                    </Typography>
                    <Typography variant="body2">
                      Received on {request.timestamp.toDate().toLocaleString()}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleResponse(request.id, 'accepted')}
                        disabled={request.status === 'accepted'}
                      >
                        {request.status === 'accepted' ? 'Accepted' : 'Accept'}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleResponse(request.id, 'rejected')}
                        disabled={request.status === 'rejected'}
                      >
                        Reject
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography align="center">No new requests</Typography>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Notifications;
