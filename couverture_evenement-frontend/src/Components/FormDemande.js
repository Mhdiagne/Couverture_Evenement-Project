import React, { useState } from 'react';
import { Autocomplete,InputAdornment,TextField,Button } from '@mui/material';
import Box from '@mui/material/Box';
import { accountService } from '../service/accountService';
import { SERVER_URL } from '../constante';
import AddService from './AddService';

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

    const handleTypeEvenementChange = ( evt,newValue) => {
        setData({
          ...data,
          typeEvenement: newValue,
        });
    };

    const postEvenement = () => {
        const token = accountService.getToken("jwt");
        console.log(token);
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
        return null
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
            <div className="contenaire">
                <h3> Creer votre Demande </h3>
                <div className='formulaireD' >
                    <Box sx={{ width: '700px', display: 'flex', flexWrap: 'wrap' }}>
                        <TextField id="nomEvenement" sx={{ mb:2, width:"325px"}} 
                        label="Nom Evenement" variant="outlined" 
                        // value={dataIn.nomEvenement}
                        name='nom'
                        onChange={handleChange} required 
                        />                
                        <Autocomplete
                                sx={{ mb:2, ml:2, width:"325px"}}
                                id="typeEvenement"
                                options={list}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Type d'Evenement"
                                    />
                                )}
                                // value={dataIn.typeEvenement}
                                onChange={handleTypeEvenementChange}      
                                required
                        />

                        <TextField type="Date" id="date-evenement"  sx={{ mb:2, width:"225px"}} 
                        variant="outlined" 
                        onChange={handleChange} 
                        //value={dataIn.dateEvenement} 
                        name='dateEvenement' required />
                        <TextField type='number' id="duree" sx={{ mb:2, ml:2, width:"150px"}} label="Duree" variant="outlined" 
                        onChange={handleChange}
                        InputProps={{endAdornment: <InputAdornment position="end">heures</InputAdornment>,}}
                        //value={dataIn.duree} 
                        name='duree' required />
                        <TextField id="lieu" sx={{ mb:2, ml:2, width:"260px"}} label="Lieu" variant="outlined" 
                        onChange={handleChange} 
                        //value={dataIn.lieu} 
                        name='lieu' required />
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            sx={{ mb:3,width:"667px"}}
                            rows={2}
                            variant="outlined"
                            onChange={handleChange}
                            //value={dataIn.description}
                            name='description'
                            required
                        />
                        <Button sx={{m: 'auto', p: 1}} id="valider" onClick={postEvenement} variant='contained'>Enregistrer</Button>
                    </Box>
                    {
                        open && <AddService open={open} ide={idE} />
                    }
                    
                </div>
            </div> 
        </div>
    );
};

export default FormDemande;