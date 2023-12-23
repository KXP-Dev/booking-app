import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const endpoint = auth.user.isAdmin ? '/api/bookings' : '/api/bookings/user';
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      }
    };

    fetchBookings();
  }, [auth.user.isAdmin]);

  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Failed to delete booking', error);
    }
  };

  return (
    <List>
      {bookings.map(booking => (
        <ListItem key={booking._id}>
          <div>
            <strong>User:</strong> {booking.user.username}
          </div>
          <div>
            <strong>Activity:</strong> {booking.activity.name}
          </div>
          <div>
            <strong>Time Slot:</strong> {booking.timeSlot}
          </div>
          {auth.user.isAdmin && (
            <Button
              color="secondary"
              onClick={() => handleDeleteBooking(booking._id)}
            >
              Delete
            </Button>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default BookingManager;