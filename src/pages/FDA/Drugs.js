import React from 'react';
import TopBanner from "../../components/TopBanner";
import Assign_Drugs from '../../components/Assign_Drugs_FDA';
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


const Drugs = () => {
	return (
		<div>
			<Assign_Drugs/>
		</div>
	)
}

export default RouteProtect(["fda.com"], Drugs);