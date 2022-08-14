import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import logo from '../logo5.png'
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth'


const pages = [{ name: 'HomePage', url: '/' }, { name: 'Users page', url: '/admin' }];
const settings = [{ name: 'Registration', url: '/registration' }, { name: 'Login', url: '/login' }];
const settings2 = [ { name: 'My Profile', url: '/my-profile' }, { name: 'Logout', url: '/login' }];


const ResponsiveAppBar = () => {
  const { authTokens, setTokens } = useContext(AuthContext);

  const handleLogout = () => {
    setTokens();
    localStorage.removeItem('tokens');
  }

  console.log(authTokens);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const currentlink = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="l" id="appBar">
        <Toolbar disableGutters >
          <Link href="/" underline="none">
            <img src={logo} alt="logo" className="App-logo"></img>
          </Link>
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
              <Button onClick={handleCloseNavMenu} sx={{ float: 'right', color: 'black' }}> X </Button>
              {pages.map((page) => (
                <Link href={page.url === '/recipes' ? "#" : page.url} id={page.url === currentlink.pathname || page.url.includes('recipes') && currentlink.pathname.includes('recipes') ? "selected" : "not-selected"} underline="none">
                  <Button
                    key={page.name}

                    sx={{ my: 2, color: 'black', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link href={page.url} id={page.url === currentlink.pathname || page.url.includes('recipes') && currentlink.pathname.includes('recipes') ? "selected" : "not-selected"} underline="none">
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}

                  sx={{ my: 2, color: 'white', display: 'block', marginLeft: 4 }}
                >
                  {page.name}
                  {((page.name === 'Recipes') ? '▼' : '')}
                </Button>

              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            > {
                !authTokens ? 
                <div>
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Link href={setting.url} underline="none">
                        <Typography textAlign="center">{setting.name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </div> :
                  <div>
                    {settings2.map((setting) => (
                      <MenuItem key={setting.name} onClick={setting.name === "Logout" ? handleLogout : undefined }>
                        <Link href={setting.url} underline="none">
                          <Typography textAlign="center">{setting.name}</Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </div>
              }


            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;