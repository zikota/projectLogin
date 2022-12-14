import '../App.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import { Grid, Avatar, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from '@mui/material';
import { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/auth'

const theme = createTheme();

export const PrivateRoute = () => {

    const { authTokens } = useContext(AuthContext);
    const { isAdmin } = useContext(AuthContext);

    return (
      isAdmin ? <Outlet /> : <Navigate to="/"/>
    );
  }
  
  