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
  import sample from "../assets/sample.png";


const Send_Samples = () => {
  const { entities } = useBavaria();

  const [studyName, setStudyName] = useState('Study Name');
  const [shippingStatus, setShippingStatus] = useState('Created');
  const [drugName, setDrugName] = useState('Drug name/type');
  const [placebo, setPlacebo] = useState('true/false');
  const [batchNumber, setBatchNumber] = useState('1-50');
  const [id, setId] = useState('xxxxxx');
  const [studyStatus, setStudyStatus] = useState('pending');

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
        const response = await entities.drug.add({
          "batchNumber": batchNumber,
          "placebo": false,
          "id": id,
          "drugType": drugName,
          "studyName": studyName,
          "studyStatus": studyStatus,
          "shipmentHistory": shippingStatus
        });

        alert(studyName + " Shipment Order Sent!");
      } else {
        alert(errorResponse + " Already Exist!");
        console.log(errorResponse + " Already Exist!");
      }

      console.log("Response:", drugList);
      //setPatients(response.items);

    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  return (
      <div style={{ textAlign: 'center', marginTop: '5em' }}>

<h1>Send Sample <img src={sample} style={{ height: "1.5em" }} /></h1>
        <Table style={{marginTop: "5em"}}>
          <TableRow>
            <TableCell style={{ fontSize: 30 }}>
              Ongoing Study:
              <input
                style={{ fontSize: 25, padding: 10, marginLeft: 10, borderRadius: 10 }}
                type="text"
                id="input-box"
                value={studyName}
                onChange={(event) => setStudyName(event.target.value)}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={{ fontSize: 30 }}>
              Shipment History:
              <input
                style={{ fontSize: 25, padding: 10, marginLeft: 10, borderRadius: 10 }}
                type="text"
                id="input-box"
                value={shippingStatus}
                onChange={(event) => setShippingStatus(event.target.value)}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={{ fontSize: 30 }}>
              Drug Name:
              <input
                style={{ fontSize: 25, padding: 10, marginLeft: 10, borderRadius: 10 }}
                type="text"
                id="input-box"
                value={drugName}
                onChange={(event) => setDrugName(event.target.value)}
              />
            </TableCell>
          </TableRow>

          <TableRow>
  <TableCell style={{ fontSize: 30 }}>
    Placebo:
    <select
      style={{ fontSize: 25, padding: 10, marginLeft: 10, borderRadius: 10 }}
      value={placebo.toString()}
      onChange={(event) => setPlacebo(event.target.value === "true")}
    >
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  </TableCell>
</TableRow>

          <TableRow>
            <TableCell style={{ fontSize: 30 }}>
              Batch Number:
              <input
                style={{ fontSize: 25, padding: 10, marginLeft: 10, borderRadius: 10 }}
                type="text"
                id="input-box"
                value={batchNumber}
                onChange={(event) => setBatchNumber(event.target.value)}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell style={{ fontSize: 30 }}>
              ID:
              <input
                style={{ fontSize: 25, padding: 10, marginLeft: 10, borderRadius: 10 }}
                type="text"
                id="input-box"
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
            </TableCell>
          </TableRow>
        </Table>

        <Button 
            style={{ fontSize: 30, padding: 40, border: '2px solid black', margin: 50 }}
            onClick={handleClick}
          >
              Confirm to Order Shipment
         </Button>
    </div>
  )
}

export default Send_Samples