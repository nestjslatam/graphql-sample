import React from 'react';
import { Link, Typography } from '@mui/material';

const CopyrightApp = (props) => {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/beyondnetPeru/">
          BeyondNet NESTJS Expert Course
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </>
  );
};

export default CopyrightApp;
