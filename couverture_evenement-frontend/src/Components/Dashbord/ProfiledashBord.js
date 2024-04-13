import React from 'react';
import "../../assets/css/styleDashbord.css"
import SidebarDashBord from './SidebarDashbord';
import FadeMenuPrest from './FadeMenuPrest';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const ProfileDashbord = () => {
    return (
        <div>
        <PrimarySearchAppBar/>
            <div className="dashboard-container">
                <SidebarDashBord />
                    <div className="content-container">
                        <br/>
                        <h1 id="special1"> My Account </h1>
                        <br/>
                    <div id='topou-ma'>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
          <Fab color="primary" aria-label="logout">
            <FadeMenuPrest/>
          </Fab>
            Deconnexion
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Fab color ="secondary" aria-label="add">
                <AddIcon/>
            </Fab>
            Ajouter 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Fab color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
          Modifier    
        </Box>                    
        </div>
                
        </div>
            </div>
       
    </div>
    );
}

export default ProfileDashbord;
