import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { accountService } from '../service/accountService';
import { SERVER_URL } from '../constante';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Dialog, DialogActions, DialogContent } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import '../assets/css/ajouterDemande.css';
import { jwtDecode } from 'jwt-decode';

const PrestatairesDisponibles = () => {

    var prestataires = [
        {
            nom: '',
            image: '',
            description: '',
            fonction: '',
            telephone: '',
            mail: ''
        }
    ];
    const [lpres, setLpres] = useState([]);
    const [event, setEvent] = useState([]);
    const [open, setOpen] = useState(false);
    const [idpres, setIdPres] = useState(0);

    useEffect(()=>{
        fetchPrestataires();
    }, []);

    useEffect(()=>{
        fetchEvenement();
    }, [open]);

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
          width: 200,
          editable: false,
        },
        {
            field:'btn1',
            sortable:false,
            with:200,
            filterable: false,
            renderCell: row => (
                <Button onClick={()=> postPrestataireToEvenement(idpres,row.id) }>
                    ajouter
                </Button>
            ),
          },
    ];

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddButtonClick = (id) => {
        setIdPres(id);
        setOpen(true);
    };

    const recupOneImage = async (id, token) => {
        try {
            const response = await fetch(SERVER_URL + `prestataire/${id}/get_img`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération de l\'image');
            }
    
            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);
            return imageUrl;
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'image:', error);
            return null; // Retourner null en cas d'erreur
        }
    };
    

    const recupImage = async (pres) => {
        const token = accountService.getToken("jwt");
        for (let i = 1; i <= pres.length; i++) {
            const one = pres.find(prest=>prest.id_prestataire===i)
            if (one.image!==null) {
                console.log(i);
                const src = await recupOneImage(i, token); 
                pres[i-1].image=src; 
            }
        }
        return pres;
    }

    const fetchPrestataires = async () => {
        try {
            const token = accountService.getToken("jwt");
            const response = await fetch(SERVER_URL + "prestataire", {
                headers: { Authorization: token },
            });
    
            if (response.status === 200) {
                const data = await response.json();
                recupImage(data);
                prestataires = await recupImage(data);
                setLpres(prestataires);
                console.log(prestataires); // Les données sont maintenant disponibles ici
            } else {
                console.error("Erreur lors de la récupération des données:", response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite:", error);
        }
    };

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


    const postPrestataireToEvenement = (idp,ide) => {
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL + `evenement/${idp}/addPrestataire/${ide}`, {
          method: "POST",
          headers: { Authorization: token, 'Content-Type': 'application/json' }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur de connexion au serveur');
        }
        if (response.status === 200) {
            alert("Le prestataire a été ajouté avec succes! ");
            return response.json();    
        }
        alert("Erreur de création");
        return null
        })
        .then(data=>{
            if (data) {
                //setIdE(data.id_Evenement);
            }
        })
        .catch(error => {
          console.error("Une erreur s'est produite :", error);
        });
    };
    

    return (
        <div>
            <Header/>   
            <h2>Prestataires Disponibles </h2>
            <div className="contenaire">
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        sx={{Width: '1000px'}}
                    >
                        Traiteur
                    </AccordionSummary>
                    <AccordionDetails sx={{display: 'flex',flexWrap:'wrap',justifyContent: 'space-between'}}>
                {   lpres.map(pres=>(
                    
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>

                            <CardMedia
                            component="img"
                            height="140"
                            image={pres.image}
                            alt={pres.nom}
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">{pres.nom}</Typography>
                                <Typography variant="body2" color="text.secondary">{pres.description}</Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" variant='contained' color="primary" onClick={()=>{handleAddButtonClick(pres.id_prestataire)}}>Ajouter</Button>
                        </CardActions>
                    </Card>
                ))
                }
                    </AccordionDetails>
                </Accordion>
                <Dialog id="all-form" maxWidth="lg" open={open} onClose={handleClose}>
                    <div className ='kay-fi' ><h2>Ajouter des prestataires à votre evenement</h2></div>
                    <DialogContent>
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
                    </DialogContent>
                    <DialogActions sx={{m:2}}>
                        <Button id='annuler' color='error' variant='outlined' onClick={handleClose}>Fermer</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}


export default PrestatairesDisponibles;