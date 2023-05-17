import React from "react";
import JaneHopkinsDoctor from "./pages/JaneHopkinsDoctor";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";

import Patients_Bavaria from './pages/Bavaria/Patients_Bavaria';
import View_Study from './pages/Bavaria/View_Study_Bavaria';
import Shipment_Page from './pages/Bavaria/Shipment_Page_Bavaria';
import BavariaHome from "./pages/Bavaria/Patients_Bavaria";
import FDAHome from "./pages/FDAHome";
import JHAddPatient from './pages/JaneHopkins_AddPatients';
import JHManageStudy from './pages/JH_ManageStudy';


function App() {

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/FDAHome" element={<FDAHome />} />
        <Route path="/JaneHopkinsDoctor" element={<JaneHopkinsDoctor />} />
          
        <Route path="/Bavaria" element={<BavariaHome />} />
        <Route path="/Patients_Bavaria" element={<Patients_Bavaria />} />
        <Route path="/View_Study" element={<View_Study />} />
        <Route path="/Shipment_Page" element={<Shipment_Page />} />

		    <Route path="/FDA/*" element={<FDAHome />} />
	
	  		

          <Route path="/JaneHopkins_AddPatients" element={<JHAddPatient />} />
          <Route path="/JaneHopkins_ManageStudy" element={<JHManageStudy />} />
          </Routes>
    </div>
  );
}

export default App;