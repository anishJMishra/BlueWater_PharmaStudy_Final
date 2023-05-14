import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AddPatient from "./AddPatient";
import PatientTable from "./PatientTable_FDABavaria";
import {
  Button,
  Stack,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import SideBanner_Bavaria from "./SideBanner_Bavaria";
import PatientDisplay from "./PatientDisplay_FDABavaria";
import PatientPopout from "./PatientPopout";
import PatientPopout_Bavaria from "./PatientPopout_Bavaria";
import useBavaria from "../hooks/useBavaria";

const PatientList = () => {
  const { entities } = useBavaria();

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
        {/* <SideBanner_Bavaria />*/}
        
      </Stack>
      <h1 style={{textAlign: "center"}}>Patient List</h1>
      <button>
        View Patients
        <p></p>
        <span><i className="fas fa-print"></i></span>
      </button>

      <p>
        
      </p>
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
          <PatientPopout_Bavaria
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
