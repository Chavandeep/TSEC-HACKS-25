import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserCard({ user }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg flex items-center cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <img
        src={user.profilePicUrl || 'https://via.placeholder.com/100'}
        alt={`${user.name}'s profile`}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <div className="font-medium text-xl">{user.name}</div>
        <div className="text-gray-600">{user.state}</div>
      </div>
    </div>
  );
}

export default UserCard;
