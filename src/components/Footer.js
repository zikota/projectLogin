import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom'

const pages = [{name: 'HomePage', url: '/'}, {name: 'Recipes', url: '/recipes'}, {name: 'Ingredients', url: '/ingredients'}, {name: 'About Us', url: '/aboutus'}];

const ResponsiveAppBar = () => {
  
  const currentlink = useLocation();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  //const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 // const handleOpenUserMenu = (event) => {
 //   setAnchorElUser(event.currentTarget);
 // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 // const handleCloseUserMenu = () => {
 //   setAnchorElUser(null);
 // };

  return (
    <AppBar position="static" >
      <Container maxWidth="l" id="appBar-footer">
        <Toolbar disableGutters >
          

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
