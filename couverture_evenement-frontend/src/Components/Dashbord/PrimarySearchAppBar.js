import React, { useEffect, useState } from 'react';
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
import { Link, Navigate } from 'react-router-dom';
import avatar from '../../assets/img/MyAvatar.svg'
import { accountService } from '../../service/accountService';
import { Avatar, ListItemIcon, Tooltip } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { jwtDecode } from 'jwt-decode';
import { SERVER_URL } from '../../constante';


export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const open = Boolean(anchorEl);
  const token = accountService.getToken("jwt");
  const [imgSrc, setImgSrc] = useState('');
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    if (token) {
        const client = jwtDecode(token);
        setNom(client.nom); setPrenom(client.prenom);
        if (client.id!==0) {
            recupImage(client.id,token);
        }
    } else {
        console.error('Le token n\'est pas une chaîne valide.');
    }
}, [token]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
      accountService.logout();
      setNavigate(true);
      console.log("clean");
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };


  const recupImage = (id, token) => {
    fetch(SERVER_URL + `utilisateur/${id}/get_img`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'image');
        }
        return response.blob();
    })
    .then(imageBlob => {
        const imageUrl = URL.createObjectURL(imageBlob);
        setImgSrc(imageUrl);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération de l\'image:', error);
    });
  }
 

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

  if (navigate){
    return <Navigate to={"/"}/>
}

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
    <Box sx={{ flexGrow: 1 }} />
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} className="inf">
                <Tooltip title="Account settings" style={{color: 'white'}}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar src={imgSrc} sx={{ width: 40, height: 40 }} />
                    </IconButton>
                    {prenom+" "+nom}
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    },
                    '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
                </MenuItem>
            </Menu>
    {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
           
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

          </Box> */}
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}