import '../App.css';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid, Avatar, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from '@mui/material';
import { AuthContext } from '../contexts/auth'
import { Navigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const theme = createTheme();

function handleSubmit(e) {
  console.log('submit');
}

function Login() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { authTokens, setTokens } = useContext(AuthContext);
    const [ errors, setErrors ] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        var myHeaders = new Headers();

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        var requestOptions = {
          method: 'POST',
          "_method": 'PUT',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        fetch("http://localhost:8000/api/login", requestOptions)
          .then(response => response.text())
          .then((result) => {
            var res= JSON.parse(result);
            if(res.success === true)
            {
              let jwt = res.access_token.plainTextToken;
              setTokens(jwt);
              setErrors([]);
            }
            else {
              console.log();
              setErrors(errors => [...errors, { id: 1, msg: res.message}]);
            }
            
          })
          .catch(error => console.log('error', error));
    }

    const showErrors = () => {
      if (errors.length > 0)
        return (
          <Stack sx={{ width: '30%', float:'right', bottom: '0' }} spacing={2}>
            {errors.map((error)=>{
              return (
                <Alert variant="outlined" severity="error">
                  {error.msg}
                </Alert>
              )
            })}
            
          </Stack>
        )
      else return;
    }

    
    useEffect(()=>{
      showErrors();
    }, [errors])

    if(authTokens)
    {
      return <Navigate to="/"></Navigate>;
    }

    return (
      <div>
      <ThemeProvider theme={theme}>
        <br/>
        {showErrors()}
        <Container component="main" maxWidth="xs">
          <br/>
          
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {setEmail(e.target.value)}}
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
                onChange={(e) => {setPassword(e.target.value)}}
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
                Sign In
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
    );
  }
  
  export default Login;
  