import React from 'react';
import { grey, red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material';

import { ThemeModes } from '../models';
import { ColorModeContext } from './themeContext';

const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = React.useState(ThemeModes.Light);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === ThemeModes.Light ? ThemeModes.Dark : ThemeModes.Light));
      }
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: red[500]
          },
          secondary: {
            main: grey[500]
          }
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppThemeProvider;
