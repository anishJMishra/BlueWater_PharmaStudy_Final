import React, { useState, useEffect } from 'react';
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
  import useBavaria from "../hooks/useBavaria";
  import drugs from "../assets/drugs.png";
  import AssignPopout from "./Assign_Drugs_Popout";


const Send_Samples = () => {
  const { entities } = useBavaria();

  const [studyName, setStudyName] = useState('Study Name');
  const [shippingStatus, setShippingStatus] = useState('Created');
  const [drugName, setDrugName] = useState('Drug name/type');
  const [placebo, setPlacebo] = useState('true/false');
  const [batchNumber, setBatchNumber] = useState('1-50');
  const [id, setId] = useState('xxxxxx');
  const [studyStatus, setStudyStatus] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [viewStudyClicked, setViewStudyClick] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);

  const [drugId, setDrugId] = useState();

  console.log("drugId", drugId);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsPopoutOpen(true);
  };

  const handlePopoutClose = () => {
    setIsPopoutOpen(false);
    setSelectedPatient(null);
  };

  const handleCheckboxChange = async (index, isChecked) => {
    try {
      const drugList = await entities.drug.list();
  
      let errorResponse = "";
      let submit = true;
  
      if (submit) {
        /* const response = await entities.drug.add({
          "batchNumber": batchNumber,
          "placebo": false,
          "id": id,
          "drugType": drugName,
          "studyName": studyName,
          "studyStatus": studyStatus,
          "shipmentHistory": shippingStatus
        }); */
      }
    } catch (error) {
      console.error("Error handling checkbox change:", error);
      // Perform additional error handling if needed
    }
  };

  const viewStudyClick = (studyName) => {
    setViewStudyClick(!viewStudyClicked);
    setSelectedStudy(studyName);
  }

  const handleClick = async () => {
    try {
      const drugList = await entities.drug.list();

      let errorResponse = "";
      let submit = true;

      for (const drug of drugList.items) {
        //console.log(drug); <-- Logs and see why other items than id will not show up in console.
        if (drug.studyName === studyName) {
          //existingDrug = drug;
          //console.log(id+'  already exists!');
          errorResponse += studyName + ' ';
          submit = false;
        } 
        else if (drug.id === id){
          errorResponse += id + ' ';
          submit = false;
        }
        else if (drug.shippingStatus === shippingStatus){
          errorResponse += shippingStatus + ' ';
          submit = false;
        }
        else if (drug.drugName === drugName){
          errorResponse += drugName + ' ';
          submit = false;
        }
      }

      if (submit) {
        /*const response = await entities.drug.add({
          "batchNumber": batchNumber,
          "placebo": false,
          "id": id,
          "drugType": drugName,
          "studyName": studyName,
          "studyStatus": studyStatus,
          "shipmentHistory": shippingStatus
        });*/

        alert(drugName + " Drugs Assigned!");
      } else {
        alert(errorResponse + " Already Exist!");
        console.log(errorResponse + " Already Exist!");
      }

      //console.log("Response:", drugList);
      //setPatients(response.items);

    } catch (error) {
      console.error("Error fetching patients:", error);
    }

    
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const drugResponse = await entities.drug.list();

        const drugResponseSize = drugResponse.items.length;

        const rows = [];

        for (let i = 0; i < drugResponseSize; i++) {

          //console.log(drugResponse.items[i]);

            rows.push({
              studyName: drugResponse.items[i].studyName,
              studyStatus: drugResponse.items[i].studyStatus,
              shipmentHistory: drugResponse.items[i].shipmentHistory,
              drugType: drugResponse.items[i].drugType,
              batchNumber: drugResponse.items[i].batchNumber,
              placebo: drugResponse.items[i].placebo,
              patientSelected: drugResponse.items[i].patientSelected,
              id: drugResponse.items[i].id,
              assign: drugResponse.items[i].assigned || false,
              drugId: drugResponse.items[i]._id,
            });

          }

        setTableRows(rows);


        //console.log(rows[0].id);
        console.log(drugResponse.items[0]);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [entities]);

  return (
    <div style={{ textAlign: 'center', marginTop: '5em' }}>
      <h1>Assign Drugs <img src={drugs} style={{ height: "2em" }}></img></h1>
      <Table style={{ marginTop: "5em" }}>
        {tableRows.map((row, index) => {
          if (row.studyStatus === "accepted") {
            return (
              <TableRow key={index}>
                <TableCell>
                  <h3>{row.studyName} [{row.studyStatus}]</h3>
                  <button onClick={() => viewStudyClick(row.studyName)}>View Study</button>
                  {selectedStudy === row.studyName && 
                    <div style={{ textAlign: "center" }}>
                        <h2>Study Name: {row.studyName}</h2>
                        <h2>Drug Name: {row.drugType}</h2>
                        <h2>batchNumber: {row.batchNumber}</h2>
                        <div style={{ textAlign: "center" }}>
                        <button style={{ color: "grey", pointerEvents: "none", textDecoration: "line-through" }}>View Selected Patients</button>
                        
                        {row.assign === false ? (
                          <div>
  
            <button onClick={() => { handlePatientClick(row.patientSelected); setDrugId(row.drugId); }}>Assign Drugs</button>
                                  <AssignPopout
                        isOpen={isPopoutOpen}
                        handleClose={handlePopoutClose}
                        patient={selectedPatient}
                        drugId={row.drugId}
                            />
                      </div>
                      
                      ) : row.assign === true ? (
                        <button style={{ color: "grey", pointerEvents: "none" }}>Drugs Assigned</button>
                        
                      ) : null}
  
                        </div>
                  </div>
                    }
                </TableCell>
              </TableRow>
            );
          }
          return null;
        })}
      </Table>
    </div>
  );
}

export default Send_Samples