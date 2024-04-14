import React, { useState } from 'react';
import { Autocomplete, TextField, Button, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import { accountService } from '../service/accountService';
import { SERVER_URL } from '../constante';
import AddService from './AddService';
import event from "../assets/svg/work-anniversary-animate.svg"

const FormDemande = () => {
    const list = ["Familliale","Religieuse","Seminaire", "Professionel","Autres...",];

    const [open, setOpen] = useState(false);
    const [idE, setIdE] = useState(0);
    const [data, setData] = useState({
        nom: "",
        typeEvenement: "",
        duree: 0,
        lieu: "",
        dateEvenement: "",
        description: ""
    });

    const handleChange = evt => {
        const value = evt.target.value;
        setData({
          ...data,
          [evt.target.name]: value
        });
    };

    const handleTypeEvenementChange = ( evt, newValue) => {
        setData({
          ...data,
          typeEvenement: newValue,
        });
    };

    const postEvenement = () => {
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL + "evenement/create", {
          method: "POST",
          headers: { Authorization: token, 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur de connexion au serveur');
          }
          if (response.status === 200) {
            setOpen(true);
            alert("Votre évènement est créé avec succès ! ");
            return response.json();    
          }
          alert("Erreur de création");
          return null;
        })
        .then(data=>{
            if (data) {
                setIdE(data.id_Evenement);
            }
        })
        .catch(error => {
          console.error("Une erreur s'est produite :", error);
        });
    };

    return (
        <div>
            
            <h3> <b>Création d'une demande de couverture</b> </h3>
        <div className='contenaire'>
            
        <Box sx={{ maxWidth: 600, ml:5 }}>
                <form >
                    <TextField
                        id="nomEvenement"
                        label="Nom Evenement"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        name="nom"
                        required
                    />
                    <Autocomplete
                        id="typeEvenement"
                        options={list}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Type d'Evenement"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                            />
                        )}
                        onChange={handleTypeEvenementChange}
                    />
                    <TextField
                        id="date-evenement"
                        label="Date de l'Evenement"
                        type="date"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                        name="dateEvenement"
                        required
                    />
                    <TextField
                        id="duree"
                        label="Durée"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    heures
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                        name="duree"
                        required
                    />
                    <TextField
                        id="lieu"
                        label="Lieu"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        name="lieu"
                        required
                    />
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        onChange={handleChange}
                        name="description"
                        required
                    />
                    <Button
                        id="valider1"
                        onClick={postEvenement}
                        variant="contained"
                        fullWidth
                    //     sx={{ mt: 7 , width:'50rem' }}
                     >
                        Enregistrer
                    </Button>
                </form>
            </Box>
            {
                open && <AddService open={open} ide={idE} />
            }
             <div className="menu-svg">
             <img alt="event" src={event} width={"600px"} />
        </div>
        </div>
       
    </div>
    );
};

export default FormDemande;
