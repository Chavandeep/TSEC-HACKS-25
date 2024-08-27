import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ userId, isCustomer }) => {
  const navigate = useNavigate();

  const handleNegotiateClick = () => {
    navigate(`/negotiate/${userId}`);
  };

  return (
    <div className="user-card">
      <button onClick={handleNegotiateClick}>
        {isCustomer ? 'Negotiate' : 'View Profile'}
      </button>
    </div>
  );
};

export default UserCard;
