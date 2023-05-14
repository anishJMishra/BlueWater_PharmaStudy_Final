import React from 'react';
import Patients_Display from '../../components/Patients_Display_Bavaria';
import Navbar_Bavaria from "../../components/Navbar_Bavaria";
import TopBanner from "../../components/TopBanner";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase-config";
import ReactToPdf from "../../components/ReactToPdf";


  const View_Study = () => {
    const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (

    <div>
      <TopBanner />

      <Navbar_Bavaria onLogout={handleLogout} />






      <div style={{padding: "2em"}}>
        <Patients_Display />

      </div>
    
      

      
    </div>
  )
}

export default View_Study;