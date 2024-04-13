import React, { useState } from 'react';
import Header from '../Components/Header';
import '../assets/css/ajouterDemande.css'
import FormDemande from '../Components/FormDemande';


const AjouterDemande = () => {


        return (
            <div>
                <Header/>
                <FormDemande />
            </div>
        );
}


export default AjouterDemande;