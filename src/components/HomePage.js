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
import { useEffect, useState, useRef, useContext } from 'react';
import { Button, useForkRef } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import Link from '@mui/material/Link';
import { AuthContext } from '../contexts/auth'


const mdTheme = createTheme();

function HomePage() {
  const { authTokens, setTokens } = useContext(AuthContext);
  
  const handleLogout = () => {
    setTokens();
    localStorage.removeItem('tokens');
  }

  console.log(authTokens);
  
  return (
    <ThemeProvider theme={mdTheme}>
        {
          !authTokens ? 
          <div>
            <div id="center">
              <Link href='/registration'><Button variant="contained">Registration</Button></Link>
            </div>
            <div id="center">
              <Link href='/login'><Button  variant="contained">Login</Button></Link>
            </div>
          </div> :
          <div id="center">
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
          </div>
        }
        <div id="center">
          <Link href='/admin'><Button  variant="contained">Admin Page</Button></Link>
        </div>
    </ThemeProvider>
  );
}

export default HomePage;