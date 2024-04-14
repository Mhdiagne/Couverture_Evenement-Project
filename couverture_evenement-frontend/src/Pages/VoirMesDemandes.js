import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { SERVER_URL } from '../constante';
import { accountService } from '../service/accountService';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyEvent from '../assets/svg/listening-happy-music-animate.svg';

const VoirMesDemandes = () => {
    const [event, setEvent] = useState([]);

    useEffect(() => {
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
            } else {
                console.error("Erreur lors de la récupération des données:", response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite:", error);
        }
    };

    return (
        <div>
            <Header />
            <h2 style={{ textAlign: 'center', margin: '2rem' }}>Liste de toutes mes demandes</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                <div style={{ marginRight: '40px' }}>
                    {event.map((e, index) => (
                        <Accordion key={index} sx={{ width: '100%', marginRight: '10rem' }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'black !important' }} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <b>{e.nom} - {e.typeEvenement}</b>
                            </AccordionSummary>
                            <AccordionDetails>
                                <b>Nom Evenement:</b> {e.nom} <br />
                                <b>Types Evenement: </b>  {e.typeEvenement}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
                <div >
                    <img alt="event" src={MyEvent} width={"500px"} />
                </div>
            </div>
        </div>
    );
}

export default VoirMesDemandes;
