import React from 'react';
import Send_Samples from '../../components/Send_Samples_Bavaria copy';
import Navbar_Bavaria from "../../components/Navbar_Bavaria";
import TopBanner from "../../components/TopBanner";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase-config";


const Shipment_Page = () => {
  const navigate = useNavigate();

const handleLogout = async () => {
  await signOut(auth);
  navigate("/");
};

  return (
    <div>

      <TopBanner/>

      <Navbar_Bavaria onLogout={handleLogout} />   

      <Send_Samples/>

     
    </div>
  )
}

export default Shipment_Page;