import React from 'react';
import { Typography, IconButton, Toolbar } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { Notification } from '../../ui';
import ThemeModeButton from '../../ui/themeMode';
import Login from '../../ui/login/login';

const ToolBarApp = ({ open, toggleDrawer }) => {
  return (
    <Toolbar
      sx={{
        pr: '24px' // keep right padding when drawer closed
      }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: '36px',
          ...(open && { display: 'none' })
        }}>
        <MenuIcon />
      </IconButton>
      <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        NestJS Expert Demo
      </Typography>
      <ThemeModeButton />
      <Notification />
      <Login />
    </Toolbar>
  );
};

export default ToolBarApp;
