import React, { useEffect, useState } from 'react';
import logo from "../assets/img/logo.png";
import "../assets/css/menu.css"
import { Link,Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { accountService } from '../service/accountService';
import { jwtDecode } from 'jwt-decode';
import { SERVER_URL } from '../constante';


const Header = ()=> {

    const [navigate, setNavigate] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const open = Boolean(anchorEl);
    const token = accountService.getToken("jwt");
    const [imgSrc, setImgSrc] = useState('');

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

    if (navigate){
        return <Navigate to={"/"}/>
    }


    return (
            
        <header className="header">
            <Link to ="/menu">
                <img src={logo} alt="Logo" className="logo"  width={55} height={55}/>
            </Link>

            <h3 className="header-title">Gestion des Couvertures d'évènements</h3>
            {/* <a href='/login'>
                <img src={avatar} alt="Avatar" className="avatar" width={45} height={45}/>
            </a> */}
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
        </header>
        
    );
}

export default Header;