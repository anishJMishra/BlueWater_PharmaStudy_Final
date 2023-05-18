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
import unknown from "../assets/profilePictures/unknownpatient.png";
import man from "../assets/profilePictures/man.jpg";
import woman from "../assets/profilePictures/woman.jpg";


export const JH_ManageStudyPopout = ({ isOpen, handleClose, patient, drugId, status }) => {
  const { entities } = useBavaria();

  const [loading, setLoading] = useState(true);
  const [tableRows, setTableRows] = useState([]);

  const [viewMode, setViewMode] = useState();
  const [patientName, setpatientName] = useState("David Upal"); // setPatientName when clicked on a name

  const confirmClick = async (drugId, statsus) => {
    try {
      //const formattedID = await entities.drug.product.get(drugId);

      if (status === "pending") {
        status = "accepted";
      } else if (status === "accepted") {
        status = "completed";
      }

      const drugFormForUpdate = await entities.drug.update({
        _id: drugId,
        assigned: true,
        studyStatus: status
      });

      //console.log("TEST", drugId);
      alert("Confirmed! Drugs Assigned. Thank you!");
    } catch (error) {
      console.error("Error handling checkbox change:", error);
      // Perform additional error handling if needed
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
              drugId: drugResponse.items[i]._id
            });

          }

        setTableRows(rows);


        //console.log(rows);
        //console.log(drugResponse.items[0].assigned)

        setLoading(false);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [entities]);



  if (!patient) {
    return null;
  }


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
  <div>
    <div>
      <h2>Manage Study (Please Confirm):</h2>
      <p>Are you sure...? Do you want to [confirm this] study?</p>
      <button onClick={() => confirmClick(drugId, status)}>Confirm</button>
    </div>
  </div>
</Typography>


      
        {/*renderPatientData()*/}
      </Box>
    </Modal>
  );
};

export default JH_ManageStudyPopout;