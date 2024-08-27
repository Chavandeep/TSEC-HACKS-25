import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useParams } from 'react-router-dom';

const firestore = firebase.firestore();

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const doc = await firestore.collection('userDetails').doc(id).get();
        if (doc.exists) {
          setUser(doc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="p-4">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <img
            src={user.profilePicUrl || 'https://via.placeholder.com/150'}
            alt={`${user.name}'s profile`}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-center mb-2">{user.name}</h1>
          <p className="text-gray-600 text-center">{user.state}</p>
          <div className="mt-4">
            {user.userType === 'Farmer' && (
              <div>
                <h2 className="text-xl font-semibold">Crops:</h2>
                <ul>
                  {user.crops.map((crop, index) => (
                    <li key={index}>{crop}</li>
                  ))}
                </ul>
                <h2 className="text-xl font-semibold">Fruits:</h2>
                <ul>
                  {user.fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                  ))}
                </ul>
                <h2 className="text-xl font-semibold">Vegetables:</h2>
                <ul>
                  {user.vegetables.map((vegetable, index) => (
                    <li key={index}>{vegetable}</li>
                  ))}
                </ul>
              </div>
            )}
            {(user.userType === 'Retailer' || user.userType === 'Customer') && (
              <div>
                <h2 className="text-xl font-semibold">Additional Details:</h2>
                <p>{user.otherDetails}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default UserProfile;
