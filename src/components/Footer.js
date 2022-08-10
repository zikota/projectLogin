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
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu PaperProps={{
            style: {
                  width: "100%",
                  maxWidth: "100%",
                  height: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: 'white',
                  color: 'black'
                }
              }}
              id="menu-appbar-mobile"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            > 
              <Button onClick={handleCloseNavMenu} sx={{float: 'right', color:'black'}}> X </Button>
              {pages.map((page) => (
                <Link href={page.url === '/recipes' ? "#" : page.url}  id={ page.url === currentlink.pathname || page.url.includes('recipes') && currentlink.pathname.includes('recipes') ? "selected":"not-selected" } underline="none">
                <Button
                  key={page.name}
                  //onClick={handleCloseNavMenu}
                  //onClick={(event) => handleMouseEnter(event, page.name)}
                  sx={{ my: 2, color: 'black', display: 'block', marginLeft: 4 }}
                >
                  {page.name}
                </Button>
                </Link>
                /*<MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>*/
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              //<Link href={page.url}  underline="none">
                <Button
                  key={page.name}
                  id={ page.url === currentlink.pathname || page.url.includes('recipes') && currentlink.pathname.includes('recipes') ? "selected":"not-selected" }
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              //</Link>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
