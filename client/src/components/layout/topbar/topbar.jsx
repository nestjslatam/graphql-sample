import React from 'react';
import PropTypes from 'prop-types';

import { AppBar } from './styled';
import ToolBarApp from './toolbar';
import DrawerApp from './drawer';

const TopbarApp = (props) => {
  const { open, toggleDrawer } = props;

  return (
    <>
      <AppBar position="absolute" open={open}>
        <ToolBarApp open={open} toggleDrawer={toggleDrawer} />
      </AppBar>
      <DrawerApp open={open} toggleDrawer={toggleDrawer} />
    </>
  );
};

TopbarApp.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func
};

export default TopbarApp;
