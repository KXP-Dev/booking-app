import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem } from '@mui/material';

const ActivityManager = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({ name: '', description: '', duration: 0, price: 0 });

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/activities', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActivities(response.data);
      } catch (error) {
        console.error('Failed to fetch activities', error);
      }
    };

    fetchActivities();
  }, []);

  const handleAddActivity = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/activities', 
        newActivity,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setActivities([...activities, response.data]);
      setNewActivity({ name: '', description: '', duration: 0, price: 0 });
    } catch (error) {
      console.error('Failed to add activity', error);
    }
  };

  return (
    <div>
      <TextField label="Name" value={newActivity.name} onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })} />
      <TextField label="Description" value={newActivity.description} onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })} />
      <TextField label="Duration" type="number" value={newActivity.duration} onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })} />
      <TextField label="Price" type="number" value={newActivity.price} onChange={(e) => setNewActivity({ ...newActivity, price: e.target.value })} />
      <Button onClick={handleAddActivity}>Add Activity</Button>

      <List>
        {activities.map(activity => (
          <ListItem key={activity._id}>{activity.name}</ListItem>
        ))}
      </List>
    </div>
  );
};

export default ActivityManager;