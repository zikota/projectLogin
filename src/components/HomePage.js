import * as React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { Button } from '@mui/material';
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