import React, { useState, useRef, useEffect } from "react";
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
  IconButton,

} from "@mui/material";
import { grey } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import useJaneHopkins from "../hooks/useJaneHopkins";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import unknown from "../assets/profilePictures/unknownpatient.png";
import man from "../assets/profilePictures/man.jpg";
import woman from "../assets/profilePictures/woman.jpg";

const PatientPopout = ({ isOpen, handleClose, patient, onUpdatePatient }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [formData, setFormData] = useState({ ...patient });
  const [editMode, setEditMode] = useState(false);


  const { entities } = useJaneHopkins();

 

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this patient? This action cannot be undone.")) {
      try {
        await entities.patient.remove(patient._id);
        console.log("Patient deleted");
        handleClose();
        onUpdatePatient();
      } catch (error) {
        console.error("Error deleting patient data: ", error);
      }
    }
  };


  useEffect(() => {
    setFormData({ ...patient });
  }, [patient]);

  const fieldsToDisplay = [
    "name",
    "dob",
    "insuranceNumber",
    "height",
    "weight",
    "bloodPressure",
    "temperature",
  ];

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => {
    setFormData({ ...patient });
    handleClose();
    setEditMode(false);
  });



  if (!patient) {
    return null;
  }

  const handleGridView = () => {
    setViewMode("grid");
  };

  const handleListView = () => {
    setViewMode("list");
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  function useOutsideClick(ref, onOutsideClick) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          onOutsideClick();
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onOutsideClick]);
  }

  const submitData = async () => {
    try {

      const formDataForUpdate = {
        _id: patient._id,
        ...Object.fromEntries(
          fieldsToDisplay.map((key) => [key, formData[key]])
        ),
      };

      const updatedPatientData = await entities.patient.update(formDataForUpdate);

      onUpdatePatient(updatedPatientData);

      setViewMode("grid");

   

    } catch (error) {
      console.error("Error updating patient data: ", error);
    }

    setEditMode(false);
  };

  const handleInputView = () => {
    setViewMode("input");
  };

  const handleModalClose = () => {
    setFormData({...patient});
   
    handleClose();
    setEditMode(false);
  }

  const renderPatientData = () => {
    if (editMode) {
      return (
        <Grid container spacing={2}>
          {fieldsToDisplay.map((key) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
              <TextField
                label={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button color="primary" onClick={submitData}>
              Save
            </Button>
          </Grid>
        </Grid>
      );
    } else {
      if (viewMode === "grid") {
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1">Name</Typography>
                <Typography variant="body2">{patient.name}</Typography>
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
                <Typography variant="body2">
                  {patient.insuranceNumber}
                </Typography>
              </Paper>
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
            <Button color="primary" onClick={handleEditClick}>
              Edit
            </Button>
            <IconButton color="secondary" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
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
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{patient.insuranceNumber}</TableCell>
                <TableCell>{patient.height}</TableCell>
                <TableCell>{patient.weight}</TableCell>
                <TableCell>{patient.bloodPressure}</TableCell>
                <TableCell>{patient.temperature}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      } else if (viewMode == "input") {
        return (
          <Box>
            <TextField
              margin="normal"
              id="standard-basic"
              label="Viral Load"
              variant="standard"
            />
            <TextField
              margin="normal"
              id="standard-notes"
              label="Notes"
              variant="standard"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={submitData}
              sx={{
                mr: 1,
                borderColor: viewMode === "input" ? "primary.main" : grey[500],
                backgroundColor:
                  viewMode === "input" ? "primary.main" : "transparent",
                color: viewMode === "input" ? "white" : "primary.main",
              }}
            >
              Submit
            </Button>
          </Box>
        );
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={() => handleModalClose()}>
      <Box
        ref={wrapperRef}
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
        <div style={{ display: "flex" }}>
          <div style={{ width: "10em", height: "10em", borderRadius: "50%", overflow: "hidden" }}>
            <img
              src={patient.hidden === "no" && patient.gender === "M" ? man : patient.hidden === "no" && patient.gender === "F" ? woman : unknown}
              alt="Gender"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ marginLeft: "1em" }}>
          <p>Name: {patient.hidden === "no" ? patient.name : <span style={{ backgroundColor: "black" }}>Classified</span>}</p>
          <p>Date: {patient.hidden === "no" ? patient.dob : <span style={{ backgroundColor: "black" }}>Classified</span>}</p>
          <p>Height/Weight: {patient.hidden === "no" ? `${patient.height} / ${patient.weight}` : <span style={{ backgroundColor: "black" }}>Classified</span>}</p>
          </div>
        </div>
      </Typography>

        <Typography variant="h6" gutterBottom>
          Patient Data
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
            onClick={handleInputView}
            sx={{
              ml: 1,
              borderColor: viewMode === "input" ? "primary.main" : grey[500],
              backgroundColor:
                viewMode === "input" ? "primary.main" : "transparent",
              color: viewMode === "input" ? "white" : "primary.main",
            }}
          >
            Viral Load
          </Button>
        </Box>
        {renderPatientData()}
      </Box>
      
    </Modal>

  );
};

export default PatientPopout;


