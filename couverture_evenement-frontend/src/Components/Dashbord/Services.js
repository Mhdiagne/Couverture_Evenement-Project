import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from "./PrimarySearchAppBar";
import SidebarDashBord from "./SidebarDashbord";
import { Box, IconButton , Button, Modal, TextField} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"; 
import { accountService } from '../../service/accountService';
import { SERVER_URL } from '../../constante';
import { jwtDecode } from 'jwt-decode';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../assets/css/style2.css"


const Services = () =>{
    const [event, setEvent] = useState([]);
    const [openModal, setOpenModal] = useState(false);
   

    const [newService, setNewService] = useState({
        libelle:""
    });

    // ----- MODAL ----
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    // ======== AJOUT SERVICE ======================
    const handleAddService = async (e) => {
        e.preventDefault();
        
        const token = accountService.getToken("jwt");
        fetch(`${SERVER_URL}prestation/create`, {
            method: 'POST',
            headers: { Authorization: token, 'Content-Type':'application/json' },
            
            body: JSON.stringify(newService)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête vers l\'API');
                }
                return response.json()
            })
            .then(
                data => {
                    console.log('Un nouveau service a été ajouté avec succès', data);
                    setOpenModal(false);
                    window.location.reload();
                })
            .catch(err => {
                console.error("Une erreur s'est produite lors de l'operation d'ajout:", err);
            });
    
        handleCloseModal(); // Fermer le modal après l'ajout
    };
    

    useEffect(()=>{
        fetchPrestation();
    }, []);
    // =============== EDITIONS =================
    const handleEdit = (row) => {
        // Logique pour l'édition
        console.log('Éditer la ligne:', row);
      };
    //===========================================
    
        const handleDelete = async (id) => {
            try {
                const token = accountService.getToken("jwt");
                const response = await fetch(SERVER_URL + `prestation/delete/${id}`, {
                    method: 'DELETE',
                    headers: { Authorization: token },
                });
                window.confirm(`Êtes-vous sûr de vouloir supprimer ${id} ?`)
                if (response.status === 200) {
                    // Mettre à jour la liste des événements après suppression
                    fetchPrestation();
                    console.log("Service supprimé avec succès");
                } else {
                    console.error("Erreur lors de la suppression du service:", response.status);
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la suppression du service:", error);
            }
        };
     
    //===========================================
    const columns = [
        {
          field: 'libelle',
          headerName: 'Libelle Service',
          width: 800,
          editable: false,
        },
        {
          field: 'operations',
          width: 100,
          sortable: false,
          filterable: false,
          renderCell: (row) => (
            <div>
              <IconButton color='primary' onClick={() => handleEdit(row)}>
                <EditIcon id="Edit"/>
              </IconButton>
              &nbsp;
              &nbsp;
              &nbsp;
              <IconButton color='error' onClick={() => handleDelete(row.id)}>
                <DeleteIcon id="Delete"/>
              </IconButton>
            </div>
          ),
        },
      ];
    // ===========================================================
    const fetchPrestation = async () => {
        try {
            const token = accountService.getToken("jwt");
            const id = jwtDecode(token).id;
            const response = await fetch(SERVER_URL + `prestation`, {
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
    //============================================================
        return (
            <div>
            <PrimarySearchAppBar/>
            <div className="dashboard-container">
                <SidebarDashBord />
                <div className="content-container">
                    <br/>
                    <h1 id="special1"> Gestion des Services 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button 
                            id="ajouterService"
                            variant="contained" 
                           
                            onClick={handleOpenModal}>
                               + Add Service
                        </Button>
                    </h1> 
                    <br/>
                    <Box sx={{ height: 650, width: '100%' }}>
                        <DataGrid
                            rows={event}
                            getRowId={row => row.id_Prestation}
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

            {/* Modal d'ajout de service */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 3,
                    }}
                >
                    <h2 id="modal-title">Ajouter un Service</h2>
                    <TextField
                        id="libelle"
                        label="Libellé du Service"
                        variant="outlined"
                        name='libelle'
                        onChange={handleChange}
                    />
                    <br/>
                    <br/>
                    
                    <Button id="ajouterService" variant="contained" onClick={handleAddService}>Ajouter</Button>
                </Box>
            </Modal>
        </div>
        );
    }


export default Services;