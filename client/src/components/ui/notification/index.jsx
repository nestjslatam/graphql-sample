import React from 'react';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';

const Notification = () => {
  return (
    <>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </>
  );
};

export default Notification;
