import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Tabs, Tab, Box } from '@mui/material';
import axios from 'axios';

const AuthPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { setAuth } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = tabIndex === 0 ? '/login' : '/register'; // Determine endpoint based on tabIndex
      const response = await axios.post(`http://localhost:5000/api/users${endpoint}`, credentials);

      // Assuming the response contains user data and a token
      setAuth({ isLoggedIn: true, isAdmin: response.data.isAdmin, user: response.data.user });
      localStorage.setItem('token', response.data.token); // Store token for subsequent requests

    } catch (error) {
      console.error('Authentication Error:', error.response?.data?.message || error.message);
      // Handle error, display a user-friendly message
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      <form onSubmit={handleSubmit}>
        <TextField label="Username" name="username" onChange={handleChange} fullWidth />
        <TextField label="Password" name="password" type="password" onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained">{tabIndex === 0 ? 'Login' : 'Register'}</Button>
      </form>
    </Box>
  );
};

export default AuthPage;