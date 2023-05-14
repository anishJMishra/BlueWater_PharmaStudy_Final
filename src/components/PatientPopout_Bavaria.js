import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { grey, yellow } from '@mui/material/colors';
import useBavaria from "../hooks/useBavaria";

export const PatientPopout_Bavaria = ({ isOpen, handleClose, patient }) => {
  const { entities } = useBavaria();

  const [viewMode, setViewMode] = useState("grid");

  console.log("PatientPopout: ", patient);

  const sendThisToPreviousVisits = patient?.name;  
  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);

  const [patientName, setpatientName] = useState("David Upal"); // setPatientName when clicked on a name

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await entities.listOfVisits.list();

        const responseSize = response.items.length;

        const rows = [];

        for (let i = 0; i < responseSize; i++) {

          if (response.items[i].patient === patientName) {
            rows.push({
              date: response.items[i].dateTime,
              viralLoad: response.items[i].hivViralLoad,
              notes: response.items[i].notes,
            });

          }

          if (rows == null || !Array.isArray(rows)) {
            rows.push({
              date: "NA",
              viralLoad: "NA",
              notes: "NA",
            })
          }
        }

        setTableRows(rows);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [entities, patientName]);



  if (!patient) {
    return null;
  }

  const handleGridView = () => {
    setViewMode("grid");
  };

  const handleListView = () => {
    setViewMode("list");
  };

  const handlePreviousVisitsView = () => {
    setViewMode("previousvisits");
  };

  const renderPatientData = () => {
    /*
    <TableCell>{row.date}</TableCell>
                <TableCell>{row.viralLoad}</TableCell>
                <TableCell style={{backgroundColor: "red"}}>[Notes Redacated]</TableCell> {row.notes
                */
    if (viewMode === "grid") {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Name</Typography>
              <Typography variant="body2" style={{ backgroundColor: patient.hidden === "no" ? "transparent" : "yellow" }}>
  {patient.hidden === "no" ? patient.name : "Redacted"}
</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Date of Birth</Typography>
              <Typography variant="body2">{patient.dob}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Insurance Number</Typography>
              <Typography variant="body2" style={{ backgroundColor: patient.hidden === "no" ? "transparent" : "yellow" }}>
  {patient.hidden === "no" ? patient.insuranceNumber : "Redacted"}
</Typography>            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Height</Typography>
              <Typography variant="body2">{patient.height}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Weight</Typography>
              <Typography variant="body2">{patient.weight}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Blood Pressure</Typography>
              <Typography variant="body2">{patient.bloodPressure}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">Temperature</Typography>
              <Typography variant="body2">{patient.temperature}</Typography>
            </Paper>
          </Grid>
        </Grid>
      );
    } else if (viewMode === "list") {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Insurance Number</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Blood Pressure</TableCell>
              <TableCell>Temperature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
            <TableCell style={{ backgroundColor: patient.hidden === "no" ? "transparent" : "yellow" }}>
  {patient.hidden === "no" ? patient.name : "Redacted"}
</TableCell>              <TableCell>{patient.dob}</TableCell>
<TableCell style={{ backgroundColor: patient.hidden === "no" ? "transparent" : "yellow" }}>
  {patient.hidden === "no" ? patient.insuranceNumber : "Redacted"}
</TableCell>
              <TableCell>{patient.height}</TableCell>
              <TableCell>{patient.weight}</TableCell>
              <TableCell>{patient.bloodPressure}</TableCell>
              <TableCell>{patient.temperature}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    } else if (viewMode === "previousvisits") {
      return (
        <div style={{ border: "1px solid black", margin: "2em", padding: "3em", float: "right"  }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Viral Load</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.date}</TableCell>
                <TableCell style={{ backgroundColor: patient.hidden === "no" ? "transparent" : "pink" }}>
  {patient.hidden === "no" ? row.viralLoad : "Redacted - study pending"}
</TableCell>
<TableCell style={{ backgroundColor: patient.hidden === "no" ? "transparent" : "pink" }}>
  {patient.hidden === "no" ? row.notes : "Redacted - study pending"}
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      );
    } 
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: "80vh",
          overflowY: "auto",
          maxWidth: "80vw",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Patient Data:
        </Typography>
        <Box sx={{ mb: 2 }}>


          <Button
            variant="contained"
            color="primary"
            onClick={handleGridView}
            sx={{
              mr: 1,
              borderColor: viewMode === "grid" ? "primary.main" : grey[500],
              backgroundColor:
                viewMode === "grid" ? "primary.main" : "transparent",
              color: viewMode === "grid" ? "white" : "primary.main",
            }}
          >
            Grid View
          </Button>


          <Button
            variant="contained"
            color="primary"
            onClick={handleListView}
            sx={{
              borderColor: viewMode === "list" ? "primary.main" : grey[500],
              backgroundColor:
                viewMode === "list" ? "primary.main" : "transparent",
              color: viewMode === "list" ? "white" : "primary.main",
            }}
          >
            List View
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousVisitsView}
            sx={{
              borderColor: viewMode === "previousvisits" ? "primary.main" : grey[500],
              backgroundColor:
                viewMode === "previousvisits" ? "primary.main" : "transparent",
              color: viewMode === "previousvisits" ? "white" : "primary.main",
            }}
          >
            Previous Visits
          </Button>


        </Box>
        {renderPatientData()}
      </Box>
    </Modal>
  );
};

export default PatientPopout_Bavaria;
export const sendThisToPreviousVisits = PatientPopout_Bavaria.sendThisToPreviousVisits;