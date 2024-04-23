import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import SidebarDashBord from './SidebarDashbord';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { accountService } from '../../service/accountService';
import { SERVER_URL } from '../../constante';
import { jwtDecode } from 'jwt-decode';

const AllEvent = () => {

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
            width: 100,
            editable: false,
        },
        {
            field: 'duree',
            headerName: 'Duree',
            width: 100,
            editable: false,
        },
        {
            field:'Operations',

            sortable:false,
            filterable: false,
            renderCell: row => (
                <Button variant='contained' color='success' onClick={()=>{onClickChoice(row.id)}} >
                    Choisir
                </Button>
            ),
          },
    ];

    const fetchEvenement = async () => {
        try {
            const token = accountService.getToken("jwt");
            const response = await fetch(SERVER_URL + "evenement", {
                headers: { Authorization: token },
            });
    
            if (response.status === 200) {
                const data = await response.json();
                const filteredData = data.filter(e => e.attribuer === false);
                setEvent(filteredData);
                console.log(event); // Les données sont maintenant disponibles ici
            } else {
                console.error("Erreur lors de la récupération des données:", response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite:", error);
        }
    };

    const onClickChoice = async (ide) => {
        try{
            const token = accountService.getToken("jwt");
            const id = jwtDecode(token).id;
            const reponse = await fetch(SERVER_URL + `evenement/${id}/addUser/${ide}`, {
                headers: { Authorization: token },
                method: "POST"
            });

            if (reponse.status === 200) {
                alert("L'evenement vous a ete attribue !");
                fetchEvenement();
            } else {
                console.error("Erreur !!! Veuillez reessayer", reponse.status);
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
                            <h1 id="special1"> Tous les Evenements </h1>
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
};

export default AllEvent;