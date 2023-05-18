import React, { useState, useEffect } from "react";
import useBavaria from "../hooks/useBavaria";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import trial from "../assets/trial.png";

const Patients_Display = ({ isOpen, handleClose, patient }) => {
  const { entities } = useBavaria();

  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);
  const [clickedTrials, setClickedTrials] = useState([]);

  const viewTrial = (studyName) => {
    setClickedTrials((prevClickedTrials) => {
      const updatedClickedTrials = [...prevClickedTrials];
      const index = updatedClickedTrials.indexOf(studyName);
      if (index !== -1) {
        updatedClickedTrials.splice(index, 1);
      } else {
        updatedClickedTrials.push(studyName);
      }
      return updatedClickedTrials;
    });
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const drugResponse = await entities.drug.list();
        const drugResponseSize = drugResponse.items.length;

        const patientResponse = await entities.patient.list();
        const patientResponseSize = patientResponse.items.length;

        const rows = [];

        for (let i = 0; i < drugResponseSize; i++) {
          rows.push({
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [entities]);

  return (
    <div style={{ padding: "20px" }}>
      <style>
          {`
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
          `}
        </style>

        <h1 style={{textAlign: "center"}}>Ongoing Trials <img src={trial} style={{ height: "1.5em" }} /></h1>
      <button>
        View Trials
        <p></p>
        <span><i className="fas fa-print"></i></span>
      </button>

      <p></p>

      <Table style={{ border: "1px solid black", backgroundColor: "white" }}>
        <TableBody>
          {tableRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell style={{ fontSize: 25 }}>
                <p style={{ textDecoration: "underline" }}>Patient uuID:</p>
                <p>{row.uuID}</p>

                {(row.studyStatus === "accepted" || row.studyStatus === "completed") && (
                  <button onClick={() => viewTrial(row.studyName)}>
                    {clickedTrials.includes(row.studyName) ? "Hide Trial" : "View Trial"}
                  </button>
                )}

                {clickedTrials.includes(row.studyName) && (row.studyStatus === "accepted" || row.studyStatus === "completed") && (
                  <div>
                    <TableCell>
                      <p style={{ textDecoration: "underline" }}>Selected Patients for the Study Group:</p>
                      {row.selectedPatient && row.selectedPatient.length > 0 && (
                        row.selectedPatient.map((patient, index) => (
                          //////////////
                        {/*<p key={index}>{patient.name}</p>*/},
                        <p key={index} style={{backgroundColor: "black"}}>Classified</p>
                    ))
                  )}
                </TableCell>
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
            <p>Study Status:</p>{" "}
            <p
              style={{
                border: "1px solid white",
                backgroundColor:
                  row.studyStatus === "accepted"
                    ? "#2D77F7"
                    : row.studyStatus === "rejected"
                    ? "#FA4F4F"
                    : row.studyStatus === "pending"
                    ? "yellow"
                    : row.studyStatus === "completed"
                    ? "#00FF00"
                    : "inherit",
                color: 
                row.studyStatus === "accepted"
                  && "black"
              }}
            >
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