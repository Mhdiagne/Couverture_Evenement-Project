import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/Logo_uasz-bg-transparent.png';
import '../assets/css/inscription.css'; 
import { SERVER_URL } from '../constante';
import axios from 'axios';

export default function Inscription() {
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        sexe: '',
        mail: '',
        password: '',
    });

    const previewImage = (event) => {
        const file = event.target.files[0];
        setImagePreview(file);
        // if (file) {
        //     const reader = new FileReader();

        //     reader.onload = function(e) {
        //         setImagePreview(e.target.result);
        //     }

        //     reader.readAsDataURL(file);
        // } else {
        //     setImagePreview(null);
        // }
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const posterUser = () => {
        const fData = new FormData();
        fData.append('file', imagePreview); // Remplacez "file" par votre fichier d'image
        fData.append('nom', formData.nom);
        fData.append('prenom', formData.prenom);
        fData.append('sexe', formData.sexe);
        fData.append('mail', formData.mail);
        fData.append('password', formData.password);
        console.log(imagePreview);
        axios.post(SERVER_URL+`utilisateur/inscriptionClient`,formData)
            .then(response=>{
            if (response.ok) {
                const userData = response.json();
                console.log('Utilisateur inscrit avec succès:', userData);
               
            } else {
                console.error('Erreur lors de l\'inscription:', response.statusText);
            }})
            .catch (error=>{
                console.error('Une erreur s\'est produite:', error);
            })
    };

    
    // const postUser = () => {
    //     const fData = new FormData();
    //     fData.append('file', imagePreview); // Remplacez "file" par votre fichier d'image
    //     fData.append('nom', formData.nom);
    //     fData.append('prenom', formData.prenom);
    //     fData.append('sexe', formData.sexe);
    //     fData.append('mail', formData.mail);
    //     console.log(fData);
    //     fetch(SERVER_URL + `utilisateur/inscriptionClient`, {
    //       method: "POST",
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //       body: fData
    //     })
    //     .then(response => {
    //       if (!response.ok) {
    //         throw new Error('Erreur de connexion au serveur');
    //     }
    //     if (response.status === 200) {
    //         alert("Inscription reussi avec succes! ");
    //         return response.json();    
    //     }
    //     alert("Erreur de création");
    //     return null
    //     })
    //     .catch(error => {
    //       console.error("Une erreur s'est produite :", error);
    //     });
    // };


    return (
        <main className="">
            <div className="inscription-container">
            <div className="inscription-container1">
            <div className="content">
                <Link to ="/">
                <img src={logo} alt='MyAvatar' className="logo" width={130} height={130}/>
                </Link>
                <h2 className="inscription-title">
                    Bienvenue ! <br/> 
                    <span className='inscription-subtitle'>Création de votre compte</span>
                    <p>Veuillez remplir toutes les champs !</p>
                </h2>
            </div>
                    {/* <Link to="#" className="inscription-link"> S'inscrire →</Link> */}
            </div>
                <form className="inscription-form" enctype="multipart/form-data">
                    <div className="inscription-left">
                        <div className="inscription-profile">
                            <label className="inscription-profile-label">Photo de Profil</label>
                            <div className="inscription-profile-upload">
                                <div className="custom-file-upload">
                                    <input type="file" id="fileInput"  accept="image/*" onChange={previewImage} />
                                    <label htmlFor="fileInput">Choisir un fichier</label>
                                </div>
                                <div id="imagePreview">
                                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />}
                                </div>
                            </div>
                        </div>
                        <br/>
                        
                        <div className="inscription-name">
                            <label className="inscription-name-label">Prénom</label>
                            <input type="text" name='prenom' required className="inscription-name-input" onChange={handleOnChange} />
                        </div>
                        <div className="inscription-name">
                            <label className="inscription-name-label">Nom</label>
                            <input type="text" name='nom'  required className="inscription-name-input" onChange={handleOnChange} />
                        </div>
                    </div>
                    <br/>
                    <div className="inscription-right">
                        <div className="inscription-gender">
                            <label className="inscription-gender-label">Sexe</label>
                            <div className="inscription-gender-options">
                                {/* Options pour sélectionner le sexe */}
                                <label><input type="radio" name="sexe" value="homme" onChange={handleOnChange} /> Homme</label>
                                <label><input type="radio" name="sexe" value="femme" onChange={handleOnChange} /> Femme</label>
                            </div>
                        </div>
                        <div className="inscription-email">
                            <label className="inscription-email-label">Email</label><br/>
                            <input type="email" name='mail'  required className="inscription-email-input" onChange={handleOnChange} />
                        </div>
                        <div className="inscription-password">
                            <label className="inscription-password-label">Password</label><br/>
                            <input type="password" name='password' required className="inscription-password-input" onChange={handleOnChange} />
                        </div>
                        <div className="inscription-confirm-password">
                            <label className="inscription-confirm-password-label">Confirmer le mot de passe</label><br/>
                            <input type="password" name='password' required className="inscription-confirm-password-input" onChange={handleOnChange} />
                        </div>
                    </div>
                    {/* Autres champs du formulaire */}
                    <button className="inscription-button" onClick={()=>posterUser()}>S'inscrire →</button>
                   
                </form>
            </div>
        </main>
    )
}
