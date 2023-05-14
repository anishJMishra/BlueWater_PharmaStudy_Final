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




const Patients_Display = ({ isOpen, handleClose, patient }) => {
  const { entities } = useBavaria();

  const [viewMode, setViewMode] = useState("grid");

  const sendThisToPreviousVisits = patient?.name;  
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [patientName, setpatientName] = useState("David Upal"); // setPatientName when clicked on a name



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
        const drugResponse = await entities.drug.list();
        const drugResponseSize = await drugResponse.items.length;

        const rows = [

        ];

        for (let i = 0; i < drugResponseSize; i++) {
          console.log(drugResponse.items[i]);

          rows.push({
            studyName: drugResponse.items[i].studyName,
            studyStatus: drugResponse.items[i].studyStatus,
            shipmentHistory: drugResponse.items[i].shipmentHistory,
            drugType: drugResponse.items[i].drugType,
            uuID: drugResponse.items[i].id,
            placebo: drugResponse.items[i].placebo,
            batchNumber: drugResponse.items[i].batchNumber
          });
        }


        setTableRows(rows);

        console.log(rows);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [entities, patientName]);

  return (
    <div style={{ padding: "20em, 40em, 20em, 20em" }}>
<style>
          {`
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
          `}
        </style>

<h1 style={{textAlign: "center"}}>Ongoing Trials:</h1>
        <button>
            View Trials
        <p></p>
        <span><i className="fas fa-print"></i></span>
      </button>

      <p></p>

        <Table style={{ border: "1px solid black", backgroundColor: "white"}}>
          <TableBody>
            {tableRows.map((row, index) => (
              <TableRow key={index} style={{borderTop: "1px solid black", borderBottom: "1px solid black"}}>
                <TableCell style={{fontSize: 25}}>Patient uuID: {row.uuID}</TableCell>
                <TableCell style={{fontSize: 25}}>Dosage information: {row.placebo}</TableCell>
                <TableCell style={{fontSize: 25}}>Type of Drug: {row.batchNumber}</TableCell>

                <TableCell style={{fontSize: 25}}>Study Name: {row.studyName}</TableCell>
                <TableCell style={{fontSize: 25}}>Drug Name: {row.drugType}</TableCell>
                <TableCell style={{fontSize: 25}}>Shipment history: {row.shipmentHistory}</TableCell>
                <TableCell style={{fontSize: 25}}>Study Status: {row.studyStatus}</TableCell>
              </TableRow>
            ))}
      
          </TableBody>
        </Table>
    
    </div>
  );
};

export default Patients_Display;