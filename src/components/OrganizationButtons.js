import React, { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

const OrganizationButtons = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <Typography sx={{ fontFamily: "Raleway", textAlign: "center" }} variant="h4">
          {props.name}
        </Typography>
        <Button
          sx={{ bgcolor: "#003987" }}
          variant="text"
          onClick={handleOpen}
        >
          <Modal open={open} onClose={handleClose}>
            <Box
              position="absolute"
              top="35%"
              left="36%"
              sx={{
                backgroundColor: "#003987",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <LoginModal
                name={props.name}
                onClose={handleClose}
               
              />
            </Box>
          </Modal>
          <img src={props.logo} alt="Organization logo" style={{ width: "200px", height: "150px" }} />
        </Button>
      </Box>
    </div>
  );
};

export default OrganizationButtons;
