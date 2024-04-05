//import event from  "../assets/img/event.png";
import './StyleUpdate.css';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import './Prestataire.css'; // Importez le fichier de style CSS
import { DataGrid } from '@mui/x-data-grid';
import { SERVER_URL } from '../Constant';
import Modal from 'react-modal';

const Prestataire = () => {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [foundPrestataire, setFoundPrestataire] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newPrestataire, setNewPrestataire] = useState({
    nom : '',
    description : '',
    fonction : '',
    telephone : '',
    mail : ''

   
  });

  ////////////////////////////////////////////////////
    //update
    const [editingPrestataire, setEditingPrestataire] = useState(null);
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [fonction, setFonction] = useState('');
    const [telephone, setTelephone] = useState('');
    const [mail, setMail] = useState('');
 
    useEffect(() => {
      fetchPrestataires();
    }, []);

    // Fonction pour récupérer la liste des prestataires depuis le back-end
  const fetchPrestataires = async () => {
    try {
      const response = await axios.get(SERVER_URL + "prestataire/api/listerPrestataire");
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des prestataires:', error);
    }
  };

   // Fonction pour gérer le clic sur le bouton Modifier
   const handleModifyClick = (prestataire, e) => {
    setEditingPrestataire(prestataire);
    setNom(prestataire.nom);
    setDescription(prestataire.description);
    setFonction(prestataire.fonction);
    setTelephone(prestataire.telephone);
    setMail(prestataire.mail);
  };

   // Fonction pour gérer la soumission du formulaire de modification
   const handleFormSubmit = async (event) => {
    event.preventDefault();
    const id = editingPrestataire.id; // Récupération de l'ID du prestataire en cours de modification
    try {
      await axios.put(SERVER_URL + "prestataire/api/modifierPrestataire/" + id , {
        nom: nom,
        description: description,
        fonction: fonction,
        telephone: telephone,
        mail: mail
      });
        // Mise à jour de la liste des prestataires après modification
        fetchPrestataires();
        // Fermeture du formulaire modal
        setEditingPrestataire(null);
      } catch (error) {
        console.error('Erreur lors de la modification du prestataire:', error);
      }
    };
  
    // Appel fetchPrestataires lors du chargement initial du composant
   // useEffect(() => {
     // fetchPrestataires();
    //}, []);
  



 

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les données depuis votre backend
    fetch(SERVER_URL + "prestataire/api/listerPrestataire")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, []); // Utilisez une dépendance vide pour exécuter l'effet une seule fois lors du montage du composant

// Fonction pour récupérer un prestataire par son ID
const fetchPrestataireById = (id) => {
    fetch(SERVER_URL + "prestataire/api/trouverPrestataire/" + id)
      .then(response => response.json())
      .then(data => setFoundPrestataire(data))
      .catch(error => console.error('Erreur lors de la recherche du prestataire par ID:', error));
  };

    
   // Gérer la recherche par ID et ouvrir le popup
   const handleSearchById = () => {
    fetchPrestataireById(searchId);
    setModalIsOpen(true);
  };


  const addButtonStyles = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };
  
  const modifyButtonStyles = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const deleteButtonStyles = {
    backgroundColor: 'red',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const rechercheButtonStyles = {
    backgroundColor: 'rgb(10, 87, 16)',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const fermerPopupButtonStyles = {
    backgroundColor: 'rgb(10, 87, 16)',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };
 
  const columns = [
    { field: 'id', headerName: 'ID', width: 76 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'fonction', headerName: 'fonction', width: 130 },
    { field: 'telephone', headerName: 'telephone', width: 130 },
    { field: 'mail', headerName: 'mail', width: 130 },
   
      {
        field: 'operation',
        headerName: 'Opération',
        sortable: false,
        width: 200,
        renderCell: (params) => (
        <div>
            <button onClick={(e) => handleModifyClick(params.row, e)} style={addButtonStyles}>Modifier</button>

            <button onClick={(e) => handleDelete(params.row.id, e)} style={deleteButtonStyles}>
                <i className="fas fa-trash-alt"></i> Supprimer
            </button>
        </div>
        ),
      },
  
  ];

 
  
  const handleDelete = (id, e) => {
    e.stopPropagation();
    // Envoyer une requête DELETE au backend pour supprimer l'élément avec l'identifiant spécifié
    fetch(SERVER_URL + "prestataire/api/supprimerPrestataire/" + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez d'autres en-têtes si nécessaire (par exemple, les jetons d'authentification)
      },
    })
    .then(response => {
      if (response.ok) {
        // Suppression réussie, mettre à jour l'état local des données
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
      } else {
        // Gérer les erreurs en cas d'échec de la suppression
        console.error('Erreur lors de la suppression:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Erreur lors de la suppression:', error);
    });
  };

  
// fonctionnalité d'ajout
const handleAddPrestataire = () => {
  // Envoyer une requête POST au backend pour ajouter la nouvelle Prestataire
  fetch(SERVER_URL + "prestataire/api/ajouterPrestataire", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPrestataire),
  })
    .then(response => response.json())
    .then(addedPrestataire => {
      // Mettre à jour l'état local des données avec la nouvelle Prestataire ajoutée
      setData(prevData => [...prevData, addedPrestataire]);
     
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout de l\'Prestataire:', error);
    });
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewPrestataire(prevState => ({
    ...prevState,
    [name]: value
  }));
};



    return (
        <div className="menu">
            <div className="prestataire-container">
                 <h1 className="prestataire-title">VOIR LES PRESTATAIRES DISPONIBLES</h1> {/* Ajoutez la classe CSS pour le titre */}

                 <div>
                     <input 
                        type="text" 
                        value={searchId} 
                        onChange={(e) => setSearchId(e.target.value)} 
                        placeholder="Rechercher par ID " 
                     />
                     <button onClick={handleSearchById} style={rechercheButtonStyles}>Rechercher</button>

                     <Modal 
                     isOpen={modalIsOpen} 
                     onRequestClose={() => setModalIsOpen(false)}
                     style={{
                        content: {
                          top: '50%',
                          left: '50%',
                          right: 'auto',
                          bottom: 'auto',
                          marginRight: '-50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'lightblue', // Couleur de fond du popup
                          borderRadius: '10px', // Bordures arrondies du popup
                          width: '400px', // Largeur du popup
                          padding: '20px' // Espacement intérieur du popup
                        },
                        overlay: {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)' // Couleur de fond de l'overlay
                        }
                      }}
                     >
                          <h2 className='voirPrestataire'>Informations du prestataire :</h2>
                              {foundPrestataire && (
                                  <div>
                                     <p>ID : {foundPrestataire.id}</p>
                                       <p>Nom : {foundPrestataire.nom}</p>
                                       <p>Description : {foundPrestataire.description}</p>
                                      <p>Fonction : {foundPrestataire.fonction}</p>
                                       <p>Téléphone : {foundPrestataire.telephone}</p>
                                         <p>Mail : {foundPrestataire.mail}</p>
                                  </div>
                               )}
                           <button onClick={() => setModalIsOpen(false)} style={fermerPopupButtonStyles} >Fermer</button>

                        
                      </Modal>
                      {editingPrestataire && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setEditingPrestataire(null)}>&times;</span>
      <h2>Modifier le prestataire</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          text="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        /><br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          text="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br />
        <label htmlFor="fonction">Fonction:</label>
        <input
          type="text"
          text="fonction"
          value={fonction}
          onChange={(e) => setFonction(e.target.value)}
          required
        /><br />
        <label htmlFor="telephone">Téléphone:</label>
        <input
          type="text"
          text="telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          required
        /><br />
        <label htmlFor="mail">Mail:</label>
        <input
          type="email"
          text="mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        /><br />
        <div>
          <button type="submit">Enregistrer</button>
          <button type="button" onClick={() => setEditingPrestataire(null)}>Annuler</button>
        </div>     
         </form>
    </div>
  </div>
)}

                       
                 </div>

                 <div className="prestataire-datagrid-container"> {/* Ajoutez la classe CSS pour le conteneur du DataGrid */}
                     <DataGrid
                    rows={data}
                    columns={columns}
                     pageSize={5}
                    checkboxSelection
                     />
                  </div>
                <div className="add-prestataire-container">
                    <h2 className='voirPrestataire'>Ajouter prestataire</h2>
                    <input type="text" name="nom" value={newPrestataire.nom} onChange={handleInputChange} placeholder="nom" />
                    <input type="text" name="description" value={newPrestataire.description} onChange={handleInputChange} placeholder="description" />
                    <input type="text" name="fonction" value={newPrestataire.fonction} onChange={handleInputChange} placeholder="fonction" />
                    <input type="text" name="telephone" value={newPrestataire.telephone} onChange={handleInputChange} placeholder="telephone" />
                    <input type="text" name="mail" value={newPrestataire.mail} onChange={handleInputChange} placeholder="mail" />

                    <button onClick={handleAddPrestataire} style={addButtonStyles}>
                         <i className="fas fa-plus"></i> Ajouter prestataire
                    </button>
                </div>
            </div>
         
        </div> 
    );
};

export default Prestataire;