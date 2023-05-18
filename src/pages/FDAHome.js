import React from 'react'
import TopBanner from '../components/TopBanner'
import FDANavbar from '../components/FDANavbar'
import { useNavigate } from "react-router-dom";
import Drugs from "./FDA/Drugs";
import Study from "./FDA/Study";
import Patients from "./FDA/Patients";
import { Route, Routes, Navigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';
import StudyDropdown from '../components/StudyDropdown';
//import '../themes/FDAtheme.module.css'

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

const FDAHome = () => {
  const navigate = useNavigate();
	const handleLogout = async () => {
		await signOut(auth);
		navigate("/");
	};
	return (
		<div>
			<TopBanner/>
			<FDANavbar onLogout = {handleLogout}/>
		<Routes>
			<Route path="/Study/" element={<Study />} />
			<Route path="/Patients/" element={<Patients />} />
			<Route path="/Drugs/" element={<Drugs />} />
		</Routes>
		<StudyDropdown/>
		</div>
	)
}

export default RouteProtect(["fda.com"], FDAHome);
