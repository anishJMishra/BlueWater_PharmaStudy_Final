import React from 'react';
import Patients_Display from '../../components/Patients_Display_FDA';
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from "react-router-dom";

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

const Study = () => {
	return (
		<div>


<div style={{padding: "2em"}}>
<Patients_Display />
	</div>
    
		</div>
	)
}

export default RouteProtect(["fda.com"], Study);