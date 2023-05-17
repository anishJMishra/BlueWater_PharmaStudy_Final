import React from 'react'
import TopBanner from '../components/TopBanner'
import FDANavbar from '../components/FDANavbar'
import { useNavigate } from "react-router-dom";
import Drugs from "./FDA/Drugs";
import Study from "./FDA/Study";
import Patients from "./FDA/Patients";
import { Route, Routes } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase-config";
import StudyProgress from '../components/StudyProgress';
//import '../themes/FDAtheme.module.css'

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
		<StudyProgress/>
		</div>
	)
}

export default FDAHome
