import React from 'react';
import { Divider, IconButton, Toolbar } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';

import { Drawer } from './styled';
import { MenuItems } from '../menu';

const DrawerApp = ({ open, toggleDrawer }) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <MenuItems />
    </Drawer>
  );
};

export default DrawerApp;
