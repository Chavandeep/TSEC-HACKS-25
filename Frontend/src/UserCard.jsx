import React from 'react';

function UserCard({ user }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p><strong>Type:</strong> {user.userType}</p>
      <p><strong>State:</strong> {user.state}</p>
      {user.userType === 'Farmer' && (
        <>
          <p><strong>Crops:</strong> {user.crops?.join(', ')}</p>
          <p><strong>Fruits:</strong> {user.fruits?.join(', ')}</p>
          <p><strong>Vegetables:</strong> {user.vegetables?.join(', ')}</p>
        </>
      )}
      {user.profilePicUrl && (
        <img src={user.profilePicUrl} alt="Profile" className="mt-4 w-32 h-32 object-cover rounded-full" />
      )}
    </div>
  );
}

export default UserCard;
