import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './Pages/Menu';
import AjouterDemande from './Pages/AjouterDemande';
import VoirMesDemandes from './Pages/VoirMesDemandes';
import PrestatairesDisponibles from './Pages/PrestatairesDisponibles';
import SuivreMaDemande from './Pages/SuivreMaDemande';
import Login from './Pages/Login';
import Inscription from './Pages/Inscription';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/ajouter-demande" element={<AjouterDemande/>} /> 
          <Route path="/voir-mes-demandes" element={<VoirMesDemandes />} />
          <Route path="/prestataires-disponibles" element={<PrestatairesDisponibles />} />
          <Route path="/suivre-ma-demande" element={<SuivreMaDemande />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Inscription />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
