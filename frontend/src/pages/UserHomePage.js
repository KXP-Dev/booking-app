import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const UserHomePage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Activities" />
        <Tab label="Bookings" />
      </Tabs>

      {tabIndex === 0 && (
        <div>
          {/* List activities here */}
        </div>
      )}

      {tabIndex === 1 && (
        <div>
          {/* List bookings here */}
        </div>
      )}
    </Box>
  );
};

export default UserHomePage;