import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './Pages/Menu';
import AjouterDemande from './Pages/AjouterDemande';
import VoirMesDemandes from './Pages/VoirMesDemandes';
import PrestatairesDisponibles from './Pages/PrestatairesDisponibles';
import SuivreMaDemande from './Pages/SuivreMaDemande';
import Login from './Pages/Login';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/ajouter-demande" element={<AjouterDemande/>} /> 
          <Route path="/voir-mes-demandes" element={<VoirMesDemandes />} />
          <Route path="/prestataires-disponibles" element={<PrestatairesDisponibles />} />
          <Route path="/suivre-ma-demande" element={<SuivreMaDemande />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
