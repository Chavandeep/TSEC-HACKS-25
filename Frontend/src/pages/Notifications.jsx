import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { collection, getDocs, getDoc, query, where, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '../Firebase/firebaseConfig';

const Notifications = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null);
  const currentUserId = auth.currentUser.uid;

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const userDocRef = doc(db, 'userDetails', currentUserId);
        const userDoc = await getDoc(userDocRef); // Use getDoc to fetch a single document
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
    const fetchRequests = async () => {
      if (userType === null) return;

      try {
        let requestsRef = collection(db, 'connections');
        let q;

        if (userType === 'Farmer') {
          q = query(requestsRef, where('farmerId', '==', currentUserId), where('status', '==', 'pending'));
        } else if (userType === 'Retailer' || userType === 'Customer') {
          q = query(requestsRef, where('buyerId', '==', currentUserId), where('status', '==', 'pending'));
        }

        const querySnapshot = await getDocs(q);
        const requestsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestsList);
      } catch (error) {
        console.error("Error fetching connection requests: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userType, currentUserId]);

  const handleAccept = async (requestId) => {
    try {
      const requestRef = doc(db, 'connections', requestId);
      await updateDoc(requestRef, { status: 'accepted' });
      setRequests(prevRequests => prevRequests.map(request => 
        request.id === requestId ? { ...request, status: 'accepted' } : request
      ));
    } catch (error) {
      console.error("Error accepting connection request: ", error);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const requestRef = doc(db, 'connections', requestId);
      await updateDoc(requestRef, { status: 'declined' });
      setRequests(prevRequests => prevRequests.filter(request => request.id !== requestId));
    } catch (error) {
      console.error("Error declining connection request: ", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Connection Requests
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          {requests.length > 0 ? (
            requests.map(request => (
              <ListItem key={request.id} sx={{ mb: 2 }}>
                <ListItemText
                  primary={`Request from ${request.buyerId}`} // Display buyerId; replace with buyer's name if available
                  secondary={`Received on ${request.timestamp.toDate().toLocaleString()}`}
                />
                <Button 
                  variant="contained" 
                  color="success" 
                  onClick={() => handleAccept(request.id)} 
                  sx={{ mr: 2 }}
                  disabled={request.status === 'accepted'} // Disable button if already accepted
                >
                  {request.status === 'accepted' ? 'Accepted' : 'Accept'}
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleDecline(request.id)}
                >
                  Decline
                </Button>
              </ListItem>
            ))
          ) : (
            <Typography>No new requests</Typography>
          )}
        </List>
      )}
    </Container>
  );
};

export default Notifications;
