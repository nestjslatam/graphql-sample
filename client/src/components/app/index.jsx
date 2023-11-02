import React from 'react';
import { Box, Container } from '@mui/material';
import { CssBaseline } from '@mui/material';

import Paths from '../../routes';
import { AppThemeProvider } from '../../theme';
import { TopbarApp } from '../layout';
import CopyrightApp from '../layout/copyright';
import { AppGlobalState } from '../../context';

const App = () => {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppGlobalState>
      <AppThemeProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <TopbarApp open={open} toggleDrawer={toggleDrawer} />
          <Container sx={{ padding: '5rem' }}>
            <Paths />
          </Container>
        </Box>
        <CopyrightApp />
      </AppThemeProvider>
    </AppGlobalState>
  );
};

export default App;
