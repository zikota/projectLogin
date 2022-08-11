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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const theme = createTheme();

function Registration() {
    const [ username, setUsername ] = useState("");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ errors, setErrors ] = useState([]);
    const [ formOk, setFormOk ] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        let errorsCount = 0;
        setErrors([]);
          
        if (firstName === '' ){
          setErrors(errors => [...errors, { id: 2, msg: "First Name is a required field."}]);
          errorsCount++;
        }
          
        if (lastName === ''){
          setErrors(errors => [...errors, { id: 3, msg: "Last Name is a required field."}]);
          errorsCount++;
        }
        if (password !== confirmPassword){
          setErrors(errors => [...errors, { id: 4, msg: "Password and Confirm Password fields must match."}]);
          errorsCount++;
        }
  
        let regexEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  
        if (!regexEmail.test(email)) {
          setErrors(errors => [...errors, { id: 5, msg: "Email format is not correct."}]);
          errorsCount++;
        }
  
        
        let regexPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{8,})");
        if (!regexPass.test(password))
        {
          setErrors(errors => [...errors, { id: 6, msg: "Password must contain 8 characters, at least one uppercase letter, at least one lowercase letter, at least 1 numeric character and at least one special character."}]);
          errorsCount++;
        }
        //console.log(errorsCount);
        if (errorsCount > 0)
          setFormOk(false);
        else 
          setFormOk(true);
    }

    useEffect(()=>{
        showErrors();
    }, [errors])

    useEffect ( () => {
      
      console.log('tu sam');
      if(formOk)
      {
        registerUser();
      }
    }, [formOk])

    function registerUser(){ 

      var formdata = new FormData();
      formdata.append("first_name", firstName);
      formdata.append("last_name", lastName);
      formdata.append("photo", "slika");
      formdata.append("password", password);
      formdata.append("username", "pas3");
      formdata.append("email", email);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };
      console.log('aaa');
      fetch("http://localhost:8000/api/register", requestOptions)
        .then(response => response.text())
        .then(result => {
          var res = JSON.parse(result);
          console.log(res);
          if(res.success === true)
          {
            setErrors(errors => [...errors, { id: 7, msg: res.message}]);
            setTimeout(function () {
              window.location.href = "/login";
            }, 500);
          }
          else {
            setErrors(errors => [...errors, { id: 8, msg: res.message.email}]);
            setFormOk(false);
          }
          
        })
        .catch(error => {
          console.log('error', error);
        });

    
    }

    function clearForm ()
    {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors([]);
    }

    const showErrors = () => {
      if (errors.length > 0)
        return (
          <Stack sx={{ width: '30%', float:'right', bottom: '0' }} spacing={2}>
            {errors.map((error)=>{
              return (
                <Alert variant="outlined" severity={ error.id !== 7 ? "error" : "success"}>
                  {error.msg}
                </Alert>
              )
            })}
          </Stack>
        )
      else return;
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
                    onChange={((e)=>{setFirstName(e.target.value)})}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    onChange={((e)=>{setLastName(e.target.value)})}
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    onChange={((e)=>{setEmail(e.target.value)})}
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
                    onChange={((e)=>{setPassword(e.target.value)})}
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
                    onChange={((e)=>{setConfirmPassword(e.target.value)})}
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