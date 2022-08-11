import * as React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';
import { AuthContext } from '../contexts/auth'
import Container from '@mui/material/Container';


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
        <Container fixed sx={{minHeight: '600px'}}>
          HomePage
        </Container>
    </ThemeProvider>
  );
}

export default HomePage;