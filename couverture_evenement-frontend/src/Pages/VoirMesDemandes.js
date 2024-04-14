import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { SERVER_URL } from '../constante';
import { accountService } from '../service/accountService';
import { Accordion, AccordionDetails, AccordionSummary, Button, Modal, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyEvent from '../assets/svg/listening-happy-music-animate.svg';
import "../assets/css/style2.css";


const VoirMesDemandes = () => {
    const [event, setEvent] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(-1);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openModal, setOpenModal] = useState(false);

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
                console.log(data);
            } else {
                console.error("Erreur lors de la récupération des données:", response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite:", error);
        }
    };

    const handleAccordionChange = (index) => {
        setExpandedIndex(index === expandedIndex ? -1 : index);
    };

    const handleOpenModal = (e, selectedEvent) => {
        e.stopPropagation(); // Empêche la propagation de l'événement d'ouvrir l'accordéon
        setSelectedEvent(selectedEvent);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <Header />
            <h2 style={{ textAlign: 'center', margin: '2rem' }}>Liste de toutes mes demandes</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                <div style={{ marginRight: '40px' }}>
                    {event.map((e, index) => (
                        <Accordion
                            key={index}
                            expanded={index === expandedIndex}
                            onChange={() => handleAccordionChange(index)}
                            sx={{ width: '100%', marginRight: '10rem' }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: 'black !important' }} />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <b>{e.nom} - {e.typeEvenement}</b>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Button  id="details" onClick={(event) => handleOpenModal(event, e)}>Voir les détails</Button>

                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
                <div >
                    <img alt="event" src={MyEvent} width={"500px"}/>
                </div>
            </div>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #eee',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h5" component="h2" fontFamily="Poppins">
                        Détails de {selectedEvent && selectedEvent.nom}
                    </Typography>
                    {selectedEvent && (
                        <div>
                            <Typography id="modal-modal-description" sx={{ mt: 2, fontFamily:"Poppins" }}>
                                <b>Nom Evenement :</b> {selectedEvent.nom} <br />
                                <b>Type Evenement : </b>  {selectedEvent.typeEvenement} <br />
                                <b>Lieu Evenement : </b>  {selectedEvent.lieu} <br />
                                <b>Durée Evenement : </b>  {selectedEvent.duree} <br />
                                <b>Date Evenement : </b>  {selectedEvent.dateEvenement} <br />
                                <b>Etat de la demande : </b>  {selectedEvent.valide} <br />

                                {/* Affichage des prestataires */}
                                <h5>  ▶ Prestataires </h5>
                                {selectedEvent.prestataires.map((prestataire, index) => (
                                    <div key={index}>
                                        <b>Nom prestataire : </b>  {prestataire && prestataire.nom} <br />
                                        <b>Email prestataire : </b>  {prestataire && prestataire.mail} <br />
                                        <b>Téléphone prestataire : </b>  {prestataire && prestataire.telephone} <br />
                                    </div>
                                ))}

                                {/* Affichage des prestations */}
                                <h5>  ▶ Prestations </h5>
                                {selectedEvent.prestations.map((prestation, index) => (
                                    <div key={index}>
                                        <b>Libelle : </b>  {prestation && prestation.libelle} <br />
                                    </div>
                                ))}

                                {/* Affichage du client */}
                                <h5>  ▶ Client </h5>
                                {selectedEvent.users.map((user, index) => (
                                <div key={index}>
                                    <b>Client : </b>  {user.prenom} {user.nom} <br />
                                    <b>Contact Client : </b>  {user.mail} <br />
                                </div>
                                ))}
                            </Typography>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
}

export default VoirMesDemandes;
