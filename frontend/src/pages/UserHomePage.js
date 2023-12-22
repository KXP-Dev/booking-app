import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/BookingForm';
import BookingsList from '../components/BookingsList';

const UserHomePage = () => {
  const [activities, setActivities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { auth } = useAuth();

  const fetchActivities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/activities');
      setActivities(response.data);
    } catch (error) {
      console.error('Failed to fetch activities', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    }
  };

  useEffect(() => {
    fetchActivities();
    if (auth.isLoggedIn) {
      fetchBookings();
    }
  }, [auth.isLoggedIn, fetchBookings]);

  return (
    <div>
      <h1>Your Dashboard</h1>

      <div>
        <h2>Book an Activity</h2>
        <BookingForm activities={activities} fetchBookings={fetchBookings} />
      </div>

      <div>
        <h2>Available Activities</h2>
        {activities.map(activity => <p key={activity._id}>{activity.name}</p>)}
      </div>

      <div>
        <h2>Your Bookings</h2>
        <BookingsList bookings={bookings} fetchBookings={fetchBookings} />
      </div>
    </div>
  );
};

export default UserHomePage;