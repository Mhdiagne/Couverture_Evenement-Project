import "../../assets/css/styleDashbord.css"
import React ,{ useEffect, useState } from 'react';
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import SidebarDashBord from "./SidebarDashbord";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";


const ServicePrestation = () => {

    return (
        <div>
            <PrimarySearchAppBar/>
                <div className="dashboard-container">
                    <SidebarDashBord />
                        <div className="content-container">
                            <br/>
                            <h1 id="special1"> Mes Prestations </h1>
                            <br/>
                           
                    </div>
                </div>         
        </div>
    );
}

export default ServicePrestation;
