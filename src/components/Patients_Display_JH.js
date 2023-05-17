import React, { useState, useEffect } from "react";
import useBavaria from "../hooks/useBavaria";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  CircularProgress,
} from "@mui/material";
import StudyProgress from './StudyProgress';
import search from "../assets/search.png";




const Patients_Display = ({ isOpen, handleClose, patient }) => {
  const { entities } = useBavaria();

  const [viewMode, setViewMode] = useState("grid");

  const sendThisToPreviousVisits = patient?.name;  
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [allPatient, setAllPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState([]);
  const [patientName, setpatientName] = useState("David Upal"); // setPatientName when clicked on a name

  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  const [patients, setPatients] = useState([]);

  const [isClickedTrial, setIsClickedTrial] = useState(false);



  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsPopoutOpen(true);
  };

  const handlePopoutClose = () => {
    setIsPopoutOpen(false);
    setSelectedPatient(null);
  };

  const viewTrial = () => {
    setIsClickedTrial(!isClickedTrial);
  }


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const drugResponse = await entities.drug.list();
        const drugResponseSize = drugResponse.items.length;
  
        const patientResponse = await entities.patient.list();
        const patientResponseSize = patientResponse.items.length;
  
        const rows = [];
        const allPatient = [];
  
        for (let i = 0; i < patientResponseSize; i++) {
          allPatient.push({
            patientName: patientResponse.items[i].name,
          });
        }
  
        for (let i = 0; i < drugResponseSize; i++) {
          rows.push({
            patientName: patientResponse.items[i].name,
            studyName: drugResponse.items[i].studyName,
            studyStatus: drugResponse.items[i].studyStatus,
            shipmentHistory: drugResponse.items[i].shipmentHistory,
            drugType: drugResponse.items[i].drugType,
            uuID: drugResponse.items[i].id,
            placebo: drugResponse.items[i].placebo,
            batchNumber: drugResponse.items[i].batchNumber,
            selectedPatient: drugResponse.items[i].patientSelected,
          });
        }
  
        setTableRows(rows);
        setAllPatients(allPatient);
  
        console.log(rows[7].selectedPatient);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
  
    fetchPatients();
  }, [entities]);

  return (
    <div style={{ padding: "20em, 40em, 20em, 20em" }}>
<style>
          {`
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
          `}
        </style>

<h1 style={{textAlign: "center"}}>Manage Study <img src={search} style={{height: "1.5em"}}></img></h1>
        <button>
            View Trials
        <p></p>
        <span><i className="fas fa-print"></i></span>
      </button>

      <p></p>

        <Table style={{ border: "1px solid black", backgroundColor: "white"}}>
          <TableBody>
            {tableRows.map((row, index) => (
              <TableRow
              
            >
              <TableCell style={{ fontSize: 25 }}>
                <p style={{ textDecoration: "underline" }}>Patient uuID:</p>
                <p>{row.uuID}</p>



                {row.studyStatus === "accepted" || row.studyStatus === "completed" ? (
              <button onClick={viewTrial}>View Trial</button>
            ) : null}
            {isClickedTrial && (row.studyStatus === "accepted" || row.studyStatus === "completed") && (
              <div>
                      <TableCell>
                      <p style={{textDecoration: "underline"}}>Selected Patients for the Study Group:</p>
                      {row.selectedPatient && row.selectedPatient.length > 0 && (
                        row.selectedPatient.map((patient, index) => (
                          <p key={index}>{patient.name}</p>
                        ))
                      )}
                     </TableCell>
                   </div>   
              )}


        { row.studyStatus === "pending" ? (
              <button>Accept</button>
            ) : null}
            {isClickedTrial && (row.studyStatus === "accepted" || row.studyStatus === "completed") && (
              <div>

                   </div>   
              )}

      {row.studyStatus === "accepted" ? (
              <button>Conclude Study</button>
            ) : null}
            {isClickedTrial && (row.studyStatus === "accepted" || row.studyStatus === "completed") && (
              <div>

                   </div>   
              )}
              



              </TableCell>
              <TableCell style={{ fontSize: 25 }}>
                <p style={{ textDecoration: "underline" }}>Dosage information:</p>{" "}
                {row.placebo}
              </TableCell>
              <TableCell style={{ fontSize: 25 }}>
                <p style={{ textDecoration: "underline" }}>Type of Drug:</p>{" "}
                {row.batchNumber}
              </TableCell>
              <TableCell style={{ fontSize: 25 }}>
                <p style={{ textDecoration: "underline" }}>Study Name:</p> {row.studyName}
              </TableCell>
              <TableCell style={{ fontSize: 25 }}>
                <p style={{ textDecoration: "underline" }}>Drug Name:</p> {row.drugType}
              </TableCell>
              <TableCell style={{ fontSize: 25 }}>
                <p style={{ textDecoration: "underline" }}>Shipment history:</p>{" "}
                {row.shipmentHistory}
              </TableCell>
              <TableCell style={{ fontSize: 25 }}>
                <p
                  key={index}

                >
                  Study Status:
                </p>{" "}
                <p style={{
                    borderTop: "1px solid black",
                    borderBottom: "1px solid black",
                    backgroundColor:
                      row.studyStatus === "accepted"
                        ? "#0000FF"
                        : row.studyStatus === "rejected"
                        ? "red"
                        : row.studyStatus === "pending"
                        ? "yellow"
                        : row.studyStatus === "completed"
                        ? "#00FF00"
                        : "inherit",
                  }}>
                    {row.studyStatus}
                    
                  </p>
                
              </TableCell>


              
            </TableRow>

            
            ))}
      
          </TableBody>
        </Table>
    
    </div>
  );
};

export default Patients_Display;