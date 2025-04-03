import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <h1>Welcome to Auth Project</h1>
      {user ? (
        <div>
          <p>You're logged in as {user.name}</p>
          <p>Your role is: {user.role}</p>
        </div>
      ) : (
        <p>Please login or register to access protected content</p>
      )}
    </div>
  );
};

export default HomePage;