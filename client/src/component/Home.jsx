import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './Logout'; // Adjust the path based on your project structure

function Home() {
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    // Check if token is in local storage
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('http://localhost:3100/api/Verify', {
          headers: { Authorization: token },
        })
        .then(response => {
          // Token is valid
          console.log(response.data);
          setVerificationMessage(`Token is valid. Welcome, User ID: ${response.data.userId}`);
        })
        .catch(error => {
          // Token is invalid
          console.error('Verification error:', error);
          setVerificationMessage('Token is invalid. Please log in again.');
        });
    } else {
      setVerificationMessage('No token found. Please log in.');
    }
  }, []);

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>This is a protected route. Only accessible if logged in.</p>
      <p>{verificationMessage}</p>

      {/* Include the Logout component */}
      <Logout  />
    </div>
  );
}

export default Home;
