import React from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Button } from '@mui/material';

const BookingsList = ({ bookings, fetchBookings }) => {

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:3000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Booking cancelled');
      fetchBookings(); // Refresh the bookings list
    } catch (error) {
      console.error('Cancellation failed:', error);
      alert('Cancellation failed');
    }
  };

  return (
    <List>
      {bookings.map(booking => (
        <ListItem key={booking.id}>
          <ListItemText primary={booking.activityName} secondary={`Time: ${booking.timeSlot}`} />
          <Button variant="outlined" color="secondary" onClick={() => cancelBooking(booking.id)}>
            Cancel
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default BookingsList;