import * as React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {
  CircleNotifications,
  ViewStream,
  Info,
  BorderColor,
  Home,
  Person
} from '@mui/icons-material';
import { Divider, Link, List } from '@mui/material';

export const MenuItems = () => {
  return (
    <List component="nav">
      <React.Fragment>
        <Link href="/" color="inherit">
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <Link href="/users" color="inherit">
          <ListItemButton>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </Link>
        <Link href="/notifications" color="inherit">
          <ListItemButton>
            <ListItemIcon>
              <CircleNotifications />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItemButton>
        </Link>
        <Link href="/events" color="inherit">
          <ListItemButton>
            <ListItemIcon>
              <ViewStream />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItemButton>
        </Link>
        <Link href="/logs" color="inherit">
          <ListItemButton>
            <ListItemIcon>
              <BorderColor />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItemButton>
        </Link>
        <Divider />
        <Link href="/about" color="inherit">
          <ListItemButton>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </Link>
      </React.Fragment>
    </List>
  );
};
