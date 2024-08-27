import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import UserCard from './UserCard';

const firestore = firebase.firestore();

function UserList() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState(''); // State for filter type

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await firestore.collection('userDetails').get();
        const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on selected filter type
  const filteredUsers = users.filter(user => 
    filter === '' || user.userType === filter
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">User List</h1>

      {/* Filter dropdown */}
      <div className="mb-4">
        <label className="text-gray-700 font-medium">Filter by User Type:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-2 p-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          <option value="Farmer">Farmer</option>
          <option value="Retailer">Retailer</option>
          <option value="Customer">Customer</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <div className="text-gray-600">No users available</div>
        )}
      </div>
    </div>
  );
}

export default UserList;
