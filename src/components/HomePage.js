import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState, useRef } from 'react';
import { Button, useForkRef } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import Link from '@mui/material/Link';


const mdTheme = createTheme();

function HomePage() {

  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <Link href='/registration'><Button>Registration</Button></Link>
        <Link href='/login'><Button>Login</Button></Link>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;