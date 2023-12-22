import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem } from '@mui/material';

const BookingForm = ({ activities }) => {
  const [bookingData, setBookingData] = useState({
    activityId: '',
    timeSlot: ''
  });

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/bookings', bookingData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Booking successful!');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        value={bookingData.activityId}
        onChange={handleChange}
        name="activityId"
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>Select an Activity</MenuItem>
        {activities.map(activity => (
          <MenuItem key={activity.id} value={activity.id}>{activity.name}</MenuItem>
        ))}
      </Select>
      <TextField
        label="Time Slot"
        type="datetime-local"
        name="timeSlot"
        value={bookingData.timeSlot}
        onChange={handleChange}
        fullWidth
      />
      <Button type="submit" variant="contained">Book Activity</Button>
    </form>
  );
};

export default BookingForm;