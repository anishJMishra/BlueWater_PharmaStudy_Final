import React from 'react';
import Patients_Display from '../components/Patients_Display_Bavaria';
import Navbar_Bavaria from "../components/Navbar_Bavaria";
import TopBanner from "../components/TopBanner";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase-config";
import { Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';

const RouteProtect = (allowedDomains, Component) => {
  const GuardedComponent = ({ ...props }) => {
    const [user] = useAuthState(auth);

    if (!user) {
      return <Navigate to="/" />;
    }

    const domain = user.email.split("@")[1];

    if (!allowedDomains.includes(domain)) {
      return <Navigate to="/" />;
    }

    return <Component {...props} />;
  };

  return GuardedComponent;
};

  const View_Study = () => {
    const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (

    <div>
      <TopBanner/>

      <Navbar_Bavaria onLogout={handleLogout} />



      
        <div style={{textAlign: "left", fontSize: "12px"}}>
          <h1>Ongoing Study: Study_name</h1>
          <h1>Shipment History: [50] drug_name vs [50] Placebo Shipment Date</h1>
        </div>


          <Patients_Display />
      

      
    </div>
  )
}

export default RouteProtect(["bavaria.com"], View_Study);