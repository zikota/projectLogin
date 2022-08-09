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
import { useEffect, useState, useRef } from 'react';
import RecipeCard from './RecipeCard';
import { Button, useForkRef } from '@mui/material';
import CarouselCard from './CarouselCard';
import Carousel from 'react-material-ui-carousel'
import Link from '@mui/material/Link';
import Recipe from './Recipe'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const mdTheme = createTheme();

function HomePage() {

  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <Button>Registration</Button>
        <Button>Login</Button>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;