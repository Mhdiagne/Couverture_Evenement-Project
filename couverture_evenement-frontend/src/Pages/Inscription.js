import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/Logo_uasz-bg-transparent.png';
import '../assets/css/inscription.css'; 

export default function Inscription() {
    const [imagePreview, setImagePreview] = useState(null);

    const previewImage = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                setImagePreview(e.target.result);
            }

            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }

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
                <form className="inscription-form">
                    <div className="inscription-left">
                        <div className="inscription-profile">
                            <label className="inscription-profile-label">Photo de Profil</label>
                            <div className="inscription-profile-upload">
                                <div className="custom-file-upload">
                                    <input type="file" id="fileInput" accept="image/*" onChange={previewImage} />
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
                            <input type="text" required className="inscription-name-input" />
                        </div>
                        <div className="inscription-name">
                            <label className="inscription-name-label">Nom</label>
                            <input type="text" required className="inscription-name-input" />
                        </div>
                    </div>
                    <br/>
                    <div className="inscription-right">
                        <div className="inscription-gender">
                            <label className="inscription-gender-label">Sexe</label>
                            <div className="inscription-gender-options">
                                {/* Options pour sélectionner le sexe */}
                                <label><input type="radio" name="gender" value="male" /> Homme</label>
                                <label><input type="radio" name="gender" value="female" /> Femme</label>
                                <label><input type="radio" name="gender" value="other" /> Autre</label>
                            </div>
                        </div>
                        <div className="inscription-email">
                            <label className="inscription-email-label">Email</label><br/>
                            <input type="email" required className="inscription-email-input" />
                        </div>
                        <div className="inscription-password">
                            <label className="inscription-password-label">Password</label><br/>
                            <input type="password" required className="inscription-password-input" />
                        </div>
                        <div className="inscription-confirm-password">
                            <label className="inscription-confirm-password-label">Confirmer le mot de passe</label><br/>
                            <input type="password" required className="inscription-confirm-password-input" />
                        </div>
                    </div>
                    {/* Autres champs du formulaire */}
                    <button className="inscription-button">S'inscrire →</button>
                   
                </form>
            </div>
        </main>
    )
}
