import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from "../../assets/img/logo.png"
import MoreIcon from '@mui/icons-material/MoreVert';
import "../../assets/css/styleDashbord.css";
import '../../assets/css/style2.css'
import { Link } from 'react-router-dom';
import avatar from '../../assets/img/MyAvatar.svg'





export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

 

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        //open={isMenuOpen}
        //onClose={handleMenuClose}
      >
        
        {/* <Link to ='/profileDashBord'>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </Link> */}
        <a href='/admin/profileDashBord'>
          <img src={avatar} alt="Avatar" className="avatar" width={45} height={45}/>
        </a>      
        </Menu>
    
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{height:'80px'}} id="costumAppBar" >
        <Toolbar>

              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 4 }}
              >
                <Link to ="/">
                    <img src={logo} alt="Logo" className="logo"  width={55} height={55}/>

                </Link>
                
              </IconButton>
              
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                
                  <h1 id='special'>Admin Dashboard</h1>

              </Typography>
          
         
       
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <text > <strong>Bonjour ,</strong> &nbsp;
          <text id='text-special'> {username}</text>
        </text>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>

          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}