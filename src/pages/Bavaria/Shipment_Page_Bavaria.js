import React from 'react';
import Send_Samples from '../../components/Send_Samples_Bavaria copy';
import Navbar_Bavaria from "../../components/Navbar_Bavaria";
import TopBanner from "../../components/TopBanner";
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase-config";
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

export default RouteProtect(["bavaria.com"], Shipment_Page);