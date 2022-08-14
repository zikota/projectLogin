import * as React from 'react';
import {  createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Link from '@mui/material/Link';
import { AuthContext } from '../contexts/auth'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Grid, Avatar, FormControlLabel, Checkbox } from '@mui/material';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

const mdTheme = createTheme();

export const MyProfile = () => {
  const { authTokens, setTokens } = useContext(AuthContext);
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ verified, setVerified ] = useState(0);
  const [ createdDate, setCreatedDate ] = useState(null);
  const [ funds, setFunds ] = useState(0);

  useEffect(() => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authTokens}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("http://localhost:8000/api/user", requestOptions)
    .then(response => response.text())
    .then((result) => {
        var res = JSON.parse(result);
        console.log(res);
        setFirstName(res.first_name);
        setLastName(res.last_name);
        setEmail(res.email);
        setVerified(res.verified);
        setCreatedDate(res.created_at.split('T')[0].toString());
        setFunds(res.funds);
    })
    .catch(error => console.log('error', error));
  }, [])

  return (
    <ThemeProvider theme={mdTheme}>
        <Container fixed sx={{minHeight: '600px'}}>
            <br/><br/><br/>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={3}>
                    <Avatar sx={{height: '120px', width: '120px'}}>{firstName.charAt(0).toUpperCase()} {lastName.charAt(0).toUpperCase()}</Avatar>
                </Grid>
                <Grid item xs={9}>
                    <Typography textAlign="left" sx={{fontSize: '25px'}}><b>First Name: </b> {firstName}</Typography>
                    <Typography textAlign="left" sx={{fontSize: '25px'}}><b>Last Name: </b>{lastName}</Typography>
                    <Typography textAlign="left" sx={{fontSize: '25px'}}><b>Email: </b>{email}</Typography>
                    <Typography textAlign="left" sx={{fontSize: '25px'}}><b>Created Date: </b>{createdDate}</Typography>
                    <Typography textAlign="left" sx={{fontSize: '25px'}}><b>Current balance: </b>{funds} €</Typography><br/>
                    <Badge
                        badgeContent={ verified ? "Verified" : "Not Verified" }
                        color={ verified ? "success" : "error" }
                        sx={{width: '80px', marginLeft: '-42px'}}
                    />
                </Grid>
            </Grid>
        </Container>
    </ThemeProvider>
  );
}
