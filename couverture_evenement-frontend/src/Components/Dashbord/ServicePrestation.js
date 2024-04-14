import "../../assets/css/styleDashbord.css"
import React ,{ useEffect, useState } from 'react';
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import SidebarDashBord from "./SidebarDashbord";
import { Box, Button, Checkbox, IconButton } from "@mui/material";
import { GridCheckCircleIcon } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";    
import { accountService } from '../../service/accountService';
import { SERVER_URL } from '../../constante';
import { jwtDecode } from 'jwt-decode';
import { Check, Clear } from "@mui/icons-material";


const ServicePrestation = () => {

    const [event, setEvent] = useState([]);
    const [hidec,setHidec]=useState("display");
    const [hider,setHider]=useState("display");

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
            width: 200,
            sortable:false,
            filterable: false,
            renderCell: row => {
                if(row.row.valide==="en cour de traitement"){
                    return(
                    <div >
                        <IconButton  id = 'btnAColorier' color="success" aria-label="Valider" onClick={()=>confirmation(row.id,"Validé")}>
                            <Check />
                        </IconButton>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <IconButton id="danger" color="error" onClick={()=>confirmation(row.id,"Refusé")}>
                            <Clear color="error" />
                        </IconButton>
                    </div>
                    )
                }else if(row.row.valide==="Validé") {
                    return(
                        <Button  variant="contained" color="primary" onClick={()=>archiverDemande(row.id)}>
                            Archiver
                        </Button>
                    )
                }else if(row.valide==="Refusé"){
                    return (
                        <p style={{color:"red"}}>Refusé</p>)
                }
            },
          },
    ];

    const donnes = (chaine) => {
        return {valide:chaine};
    }

    const fetchEvenement = async () => {
        try {
            const token = accountService.getToken("jwt");
            const id = jwtDecode(token).id;
            const response = await fetch(SERVER_URL + `evenement/evenementofuser/${id}`, {
                headers: { Authorization: token },
            });
    
            if (response.status === 200) {
                const data = await response.json();
                const filteredData = data.filter(e => e.archive === false);
                const filtData = filteredData.filter(e => e.valide !== 'Refusé');
                setEvent(filtData);
                console.log(event); // Les données sont maintenant disponibles ici
            } else {
                console.error("Erreur lors de la récupération des données:", response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite:", error);
        }
    };

    const confirmation = (id,chaine) =>{
        // if (window.confirm("Etes vous sur de votre choix ?")) {
            const token = accountService.getToken("jwt");
            fetch(SERVER_URL+`evenement/validate/${id}`,
            {   
                method: "PATCH",
                headers:{
                    Authorization: token,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(donnes(chaine))
            })
            .then(response=>{
                if (response.ok) {
                    fetchEvenement();
                    (chaine==="Validé") ? setHidec("displaytext") : setHider("displayrtext");   
                }else{
                    alert("Un problème est survenu ! Veuillez reéssayer :(");
                }
            })
            .catch(err => console.error(err));
        //}
    }

    const archiverDemande = (id) =>{
        // if (window.confirm("Etes vous sur de votre choix ?")) {
            const token = accountService.getToken("jwt");
            fetch(SERVER_URL+`evenement/archiver/${id}`,
            {   
                method: "PATCH",
                headers:{
                    Authorization: token,
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
            .then(response=>{
                if (response.ok) {
                    fetchEvenement(); 
                }else{
                    alert("Un problème est survenu ! Veuillez reéssayer :(");
                }
            })
            .catch(err => console.error(err));
        //}
    }

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
