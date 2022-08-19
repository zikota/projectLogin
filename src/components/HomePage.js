import * as React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';
import { AuthContext } from '../contexts/auth'
import Container from '@mui/material/Container';
import { Grid, Avatar, FormControlLabel, Checkbox } from '@mui/material';
import image from '../uc.png'


const mdTheme = createTheme();

function HomePage() {
  const { authTokens, setTokens } = useContext(AuthContext);
  const { isAdmin, setIsAdmin } = useContext(AuthContext);
  return (
    <ThemeProvider theme={mdTheme}>
      <br/>
          <Container fixed>
              <img src={image} style={{width: '50%', paddingLeft: '25%'}}></img>
          </Container>
    </ThemeProvider>
  );
}

export default HomePage;