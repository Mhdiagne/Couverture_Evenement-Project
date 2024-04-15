import React, { useEffect, useState } from 'react';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import SidebarDashBord from './SidebarDashbord';
import { Box, IconButton, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { accountService } from '../../service/accountService';
import { SERVER_URL } from '../../constante';
import jsPDF from "jspdf";
import "jspdf-autotable";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Rapports = () => {
    const [events, setEvents] = useState([]);

    useEffect(()=>{
      fetchEvenementArchiveMensuels();
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
            field: 'user.prenom',
            headerName: 'Client',
            width: 150,
            editable: false,
        },
        {
            field: 'prestations',
            headerName: 'Prestation',
            width: 200,
            editable: false,
            renderCell: (params) => {
                return params.row.prestations.map(prestation => prestation.libelle).join(', ');
            }
        },
        {
            field: 'prestataires',
            headerName: 'Prestataire',
            width: 200,
            editable: false,
            renderCell: (params) => {
                return params.row.prestataires.map(prestataire => prestataire.nom).join(', ');
            }
        }
    ];

    const fetchEvenementArchiveMensuels = async () => {
        try {
            const token = accountService.getToken("jwt");
            const response = await fetch(SERVER_URL + "evenement", {
                headers: { Authorization: token },
            });
    
            if (response.status === 200) {
                const data = await response.json();
                const filteredData = data.filter(e => e.archive === true); // Vérifiez si l'événement est archivé
                setEvents(filteredData);
            } else {
                console.error("Erreur lors de la récupération des données:", response.status);
            }
        } catch (error) {
            console.error("Une erreur s'est produite:", error);
        }
    };

    // Fonction pour générer le rapport PDF
    const handleGenerateReport = () => {
      const doc = new jsPDF();
      doc.autoTable({
          head: [['Nom Evenement', 'Type Evenement', 'Date Evenement', 'Client', 'Prestation', 'Prestataire']],
          body: events.map(event => [
              event.nom,
              event.typeEvenement,
              event.dateEvenement,
              event.user ? event.user.prenom : '', // Vérifiez si user existe avant d'accéder à prenom
              event.prestations.map(prestation => prestation.libelle).join(', '),
              event.prestataires.map(prestataire => prestataire.nom).join(', ')
          ])
      });
      doc.save('rapport_evenements-mensuels.pdf');
    };

    return (
        <div>
            <PrimarySearchAppBar/>
            <div className="contenaire">
                <SidebarDashBord />
<br/>


                <div className="content-container" style={{ width: '100%', overflowX: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '3cm' }}>
                    <br/>
<br/>
                        <Typography variant="h5" id="special1">
                            Generations de Rapports Mensuels
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                        </Typography>
                        <IconButton onClick={handleGenerateReport} aria-label="generate report">
                            <PictureAsPdfIcon sx={{ color: "red" }} />
                        </IconButton>
                    </div>

                    <Box sx={{ height: 650, width: '100%' }}>
                        <DataGrid
                            rows={events}
                            getRowId={row => row.id_Evenement} // Utilisez id_Evenement comme identifiant unique
                            columns={columns}
                            pageSize={15}
                        />
                    </Box>
                </div>
            </div>         
        </div>
    );
};

export default Rapports;