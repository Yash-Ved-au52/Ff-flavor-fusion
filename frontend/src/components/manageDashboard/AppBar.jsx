import React, { useState } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import AddRecipe from '../AddRecipe';
import { logout } from './logout';

const pages = ['My Collection', 'Add Recipe'];
const settings = ['Logout'];

function AppBarWithAddRecipe({ name, onShowCollection }){
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showAddRecipe, setShowAddRecipe] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event)=>{
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = ()=>{
    setAnchorElNav(null);
  };

  const handleCloseUserMenu =()=>{
    setAnchorElUser(null);
  };

  const handleMenuClick = (page) => {
    if(page === 'Add Recipe') 
    {
      setShowAddRecipe(true);
      handleCloseNavMenu();
    } else if(page === 'My Collection') 
    {
      onShowCollection();
      handleCloseNavMenu();
    }
  };

  let handleLogout = ()=>{
    logout()
      .then((message)=>{
        console.log('logout success');
      })
      .catch((error)=>{
        console.log(error);
      });
    handleCloseUserMenu();
  };

const handleCloseAddRecipe =()=>{
    setShowAddRecipe(false);
  };

const handleCancel=()=>{
    setShowAddRecipe(false);
    window.location.reload(); // Reload the dashboard page
  };

return(
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ display: { xs: 'flex', md: 'none' } }}>
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/dashboard"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}>
                Flavor Fusion
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    variant="contained"
                    color="secondary"
                    onClick={() => handleMenuClick(page)}
                    sx={{ mr: 2 }} >
                    {page}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit" >
                <Avatar alt="User Avatar" />
              </IconButton>
              <Typography sx={{ marginRight: 1 }}>{name}</Typography>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu} >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleLogout}>
                    <Typography>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right', }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}>
                {pages.map((page)=>(
                  <MenuItem key={page} onClick={() => handleMenuClick(page)}>
                    <Typography>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {showAddRecipe && <AddRecipe onClose={handleCloseAddRecipe} onCancel={handleCancel} />}
    </>
  );
}
export default AppBarWithAddRecipe;