import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { auth } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      {!auth.isLoggedIn ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          {auth.isAdmin && <Link to="/admin">Admin</Link>}
          {/* Add a logout button/link here */}
        </>
      )}
    </nav>
  );
};

export default NavBar;