import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import Cookies from 'js-cookie';
import './UserProfile.css'; // Import your CSS file
import { getUser } from '../services/api';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a GET request to retrieve user data based on userId
        const response = await getUser(userId)
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle errors, show error message, etc.
      }
    };

    fetchUserData();
  }, []);


  const handleLogout = () => {
    // Remove user ID from cookies and redirect to the login page
    Cookies.remove('userId');
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <p>
          {/* <strong>Username:</strong> {username} */}
        </p>
        <p>
          {/* <strong>Email:</strong> {email} */}
        </p>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
