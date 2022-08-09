import '../App.css';
import * as React from 'react';
//import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid, Avatar, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from '@mui/material';
import { useState, useEffect } from 'react';

const theme = createTheme();

function Registration() {
    const [ username, setUsername ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const [ formOk, setFormOk ] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        let errorsCount = 0;
        setErrors([]);
        if (username.length < 6 || username.length > 12)
        {
          setErrors(errors => [...errors, 1]);
          //createNotification('error', 1);
          errorsCount++;
        }
          
        if (firstName === '' ){
          setErrors(errors => [...errors, 2]);
          //createNotification('error', 2);
          errorsCount++;
        }
          
        if (lastName === ''){
          setErrors(errors => [...errors, 3]);
          //createNotification('error', 3);
          errorsCount++;
        }
        if (password !== confirmPassword){
          setErrors(errors => [...errors, 4]);
          //createNotification('error', 4);
          errorsCount++;
        }
  
        let regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  
        if (!regexEmail.test(email)) {
          setErrors(errors => [...errors, 5]);
          //createNotification('error', 5);
          errorsCount++;
        }
  
        let regexPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");
        if (!regexPass.test(password))
        {
          setErrors(errors => [...errors, 6]);
          //createNotification('error', 6);
          errorsCount++;
        }
        if (errorsCount > 0)
          setFormOk(false);
        else 
          setFormOk(true);
    }

    useEffect(()=>{
        console.log(errors);
    }, [errors])

    return (
      <div>

        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password"
                    />
                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Register
                    </Button>
                    <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                        Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>      
            </Container>
        </ThemeProvider>
    </div>
    )
}
export default Registration;