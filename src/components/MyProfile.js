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
  const [ createdDate, setCreatedDate ] = useState("");
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
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={4}>
                        <Typography textAlign="left" sx={{fontSize: '25px'}}>
                            <b> First Name: </b><br/>
                            <b>Last Name:  </b><br />
                            <b>Email: </b><br/>
                            <b>Current balance: </b>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography textAlign="left" sx={{fontSize: '25px'}}> {firstName}</Typography>
                        <Typography textAlign="left" sx={{fontSize: '25px'}}>{lastName}</Typography>
                        <Typography textAlign="left" sx={{fontSize: '25px'}}>{email}</Typography>
                        <Typography textAlign="left" sx={{fontSize: '25px'}}>{funds} €</Typography><br/>
                    </Grid>
                </Grid>
                    <div
                        style={{width: '200px', height: '30px', paddingLeft:"5px", color: "white", backgroundColor: verified ? "#92AE32" : "#C60023"}}
                    >
                        { verified ? "Verified" : "Not Verified" }
                    </div>
                </Grid>
            </Grid>
        </Container>
    </ThemeProvider>
  );
}
