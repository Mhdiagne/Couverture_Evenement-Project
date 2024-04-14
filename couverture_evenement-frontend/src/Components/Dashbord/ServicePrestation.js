import "../../assets/css/styleDashbord.css"
import React ,{ useEffect, useState } from 'react';
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import SidebarDashBord from "./SidebarDashbord";
import { Box, Button, Checkbox, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";    
import { accountService } from '../../service/accountService';
import { SERVER_URL } from '../../constante';
import { jwtDecode } from 'jwt-decode';


const ServicePrestation = () => {

    const [event, setEvent] = useState([]);

    useEffect(()=>{
        fetchEvenement();
    }, []);

    const columns = [
        {
          field: 'nom',
          headerName: 'Nom Evenement',
          width: 200,
          editable: false,
        },
        {
          field: 'typeEvenement',
          headerName: 'Type Evenement',
          width: 200,
          editable: false,
        },
        {
          field: 'dateEvenement',
          headerName: 'Date Evenement',
          width: 150,
          editable: false,
        },
        {
            field: 'lieu',
            headerName: 'Lieu',
            width: 200,
            editable: false,
        },
        {
            field: 'valide',
            headerName: 'Valide',
            width: 200,
            editable: false,
        },
        {
            field: 'duree',
            headerName: 'Duree',
            width: 100,
            editable: false,
        },
        {
            field:'btn1',

            sortable:false,
            filterable: false,
            renderCell: row => (
                <Button variant='contained' color='success' >
                    <Checkbox />
                </Button>
            ),
          },
    ];

    const fetchEvenement = async () => {
        try {
            const token = accountService.getToken("jwt");
            const id = jwtDecode(token).id;
            const response = await fetch(SERVER_URL + `evenement/evenementofuser/${id}`, {
                headers: { Authorization: token },
            });
    
            if (response.status === 200) {
                const data = await response.json();
                setEvent(data);
                console.log(event); // Les données sont maintenant disponibles ici
            } else {
                console.error("Erreur lors de la récupération des données:", response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite:", error);
        }
    };

    return (
        <div>
            <PrimarySearchAppBar/>
                <div className="dashboard-container">
                    <SidebarDashBord />
                        <div className="content-container">
                            <br/>
                            <h1 id="special1"> Mes Prestations </h1>
                            <br/>
                            <Box sx={{ height: 650, width: '100%' }}>
                                <DataGrid
                                rows={event}
                                getRowId={row => row.id_Evenement}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                    paginationModel: {
                                        pageSize: 15,
                                    },
                                    },
                                }}
                                pageSizeOptions={[15]}
                                disableRowSelectionOnClick
                                />
                            </Box>                   
                    </div>
                </div>         
        </div>
    );
}

export default ServicePrestation;
