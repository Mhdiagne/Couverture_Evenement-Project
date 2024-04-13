import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { SERVER_URL } from '../constante';
import { accountService } from '../service/accountService';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const VoirMesDemandes = () => {

    const [event, setEvent] = useState([]);

    useEffect(()=>{
        fetchEvenement();
    }, []);

    const fetchEvenement = async () => {
        try {
            const token = accountService.getToken("jwt");
            const response = await fetch(SERVER_URL + "evenement", {
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
            <Header/>
                <h2 style={{textAlign:'center', m:'4rem'}}>Liste de tous mes demandes </h2>
                <div className="contenaire">
                {event.map(e=>(
                    <Accordion sx={{width: '60%', m:'auto'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            {e.nom} {e.typeEvenement}
                        </AccordionSummary>
                        <AccordionDetails sx={{display: 'flex',flexWrap:'wrap',justifyContent: 'space-between'}}>
    
                        </AccordionDetails>
                    </Accordion>
                ))}
                </div>
            </div>
        );
}


export default VoirMesDemandes;