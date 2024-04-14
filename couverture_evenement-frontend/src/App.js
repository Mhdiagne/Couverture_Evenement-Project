import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './Pages/Menu';
import AjouterDemande from './Pages/AjouterDemande';
import VoirMesDemandes from './Pages/VoirMesDemandes';
import PrestatairesDisponibles from './Pages/PrestatairesDisponibles';
import SuivreMaDemande from './Pages/SuivreMaDemande';
import Login from './Pages/Login';
import Inscription from './Pages/Inscription';
import AdminDashbord from './Pages/AdminDashbord';
import ProfileDashbord from './Components/Dashbord/ProfiledashBord';
import ServicePrestation from './Components/Dashbord/ServicePrestation';
import HomeDashBord from './Components/Dashbord/HomeDashBord';
import Rapports from './Components/Dashbord/Rapports';
import AllEvent from './Components/Dashbord/AllEvent';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/menu" element={<Menu />} />
          {/* ------------------ ADMIN ------------------------------ */}
          <Route path="/admin" element={<AdminDashbord />} />
          <Route path="/admin/home" element={<HomeDashBord />} />
          <Route path='/admin/profile' element={<ProfileDashbord/>}/>
          <Route path='/admin/prestations' element={<ServicePrestation/>}/>
          <Route path='/admin/rapports' element={<Rapports/>}/>
          <Route path= '/admin/evenement' element={<AllEvent/>}/>
          {/* -------------------------------------------------------- */}
          <Route path="/ajouter-demande" element={<AjouterDemande/>} /> 
          <Route path="/voir-mes-demandes" element={<VoirMesDemandes />} />
          <Route path="/prestataires-disponibles" element={<PrestatairesDisponibles />} />
          <Route path="/suivre-ma-demande" element={<SuivreMaDemande />} />
          <Route path="/" element={<Login />} />
          <Route path="/inscription" element={<Inscription />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
