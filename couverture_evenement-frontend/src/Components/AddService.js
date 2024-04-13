import React, { useState } from 'react';
import { Autocomplete,InputAdornment,DialogContent,DialogActions,Dialog,TextField,Button } from '@mui/material';
import { accountService } from '../service/accountService';
import { SERVER_URL } from '../constante';

const AddService = (props) => {

    const [selectedService, setSelectedService] = useState(null);
    const [open, setOpen] = useState(props.open);
    const [services, setService] = useState([]);
    const [disabledServices, setDisabledService] = useState([]);

    React.useEffect(()=>{
        fetchServices();
    },[open]);


    const handleClose = () => {
        setOpen(false);
    };

    const handleServiceChange = (event, newValue) => {
        setSelectedService(newValue);
    };

    // const donnes=(idp,ide) => {
    //     const d = {
    //         evenement:{id:ide},
    //         prestataire:{id:idp},
    //         valide:"en attente"
    //     }
    //     return d;
    // };

    const ajoutservice = (ide) => {
        // Assurez-vous qu'un Service est sélectionné
        if (!selectedService) {
          alert("Veuillez sélectionner un Service");
          return;
        }
        const selectedServiceId = selectedService.id_Prestation;
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL+`evenement/${selectedServiceId}/addService/${ide}`,
        {   
            method: "POST",
            headers:{
                Authorization: token,
                'Content-Type': 'application/json'
            }
        })
        .then(response=>{
            if (response.ok) {
                setDisabledService(prevDisabledServices => [...prevDisabledServices, selectedService]);
                alert("Service ajouté avec succcés!")  
            }else{
                alert("Un problème est survenu ! Veuillez reéssayer :(");
            }
        })
        .catch(err => console.error(err));
        // Accédez à l'ID du Service sélectionné
    
        // Vous pouvez maintenant utiliser selectedServiceId selon vos besoins
        console.log("ID du Service sélectionné :", selectedServiceId);
    
        // Reste de votre code pour ajouter le Service...
      };

    const fetchServices= () => {
        const token = accountService.getToken("jwt");
        fetch(SERVER_URL+"prestation", {
            headers: {Authorization: token},
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();    
                }
                return null;
            })
            .then(data => {
                setService(data)
            })
            .catch(err => console.error(err));
    };

    return (
        <div>
            <Dialog id="all-form" maxWidth="lg" open={open} onClose={handleClose}>
                <div className ='kay-fi' ><h2>Choisissais des services pour votre evenement</h2></div>
                <DialogContent>
                <Autocomplete
                    sx={{m:2, width:"750px"}}
                    id="ajout-pretataires"
                    options={services}
                    getOptionSelected={(option, value) => option.libelle === value.libelle}
                    getOptionDisabled={(option) => disabledServices.some(service=>option===service)}
                    getOptionLabel={(option) => option.libelle}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                            <div>
                                <b>{option.libelle}</b>
                            </div>
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        variant="outlined"
                        label="Choisissais vos services"
                        />
                    )}
                    required
                    onChange={handleServiceChange}
                />
                </DialogContent>
                <DialogActions sx={{m:2}}>
                    <button id="valider" onClick={()=>{ajoutservice(props.ide)}} >Ajouter</button>
                    <button id='annuler' onClick={handleClose}>Fermer</button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddService;