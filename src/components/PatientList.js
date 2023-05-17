import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddPatient from "../components/AddPatient";
import useJaneHopkins from "../hooks/useJaneHopkins";
import PatientTable from "../components/PatientTable";
import {
  Button,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import SideBanner from "../components/SideBanner";
import PatientDisplay from "../components/PatientDisplay";
import PatientPopout from "../components/PatientPopout";

const PatientList = () => {
  const { entities } = useJaneHopkins();

  const [loading, setLoading] = useState(true);



  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  const [patients, setPatients] = useState([]);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsPopoutOpen(true);
  };

  const handlePopoutClose = () => {
    setIsPopoutOpen(false);
    setSelectedPatient(null);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await entities.patient.list();
        //console.log("Response:", response);
        setPatients(response.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [entities]);

  return (
    <div>
      <head>
        <style>
          {`
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
          `}
        </style>
      </head>
      
      <Stack direction="row">
        <SideBanner />
        <Box></Box>
      </Stack>
      <h1>Patient List</h1>
      <button>
        View Patients
        <p></p>
        <span><i className="fas fa-print"></i></span>
      </button>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <PatientTable
            patients={patients}
            onPatientClick={handlePatientClick}
          />
          <PatientPopout
            isOpen={isPopoutOpen}
            handleClose={handlePopoutClose}
            patient={selectedPatient}
          />
        </>
      )}
    </div>
  );
};

export default PatientList;
