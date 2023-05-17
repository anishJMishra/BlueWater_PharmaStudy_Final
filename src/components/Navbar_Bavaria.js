import React from 'react';
import { ThemeProvider, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import logo from "../assets/bavaria.png";
import Patients_Bavaria from "../pages/Bavaria/Patients_Bavaria";
import View_Study from "../pages/Bavaria/View_Study_Bavaria";
import Shipment_Page from "../pages/Bavaria/Shipment_Page_Bavaria";
import logoutImg from '../assets/logout.png';
import { Route, Routes, Link } from "react-router-dom";
import Bavariatheme from "../themes/Bavariatheme";

const Navbar_Bavaria = ({ onLogout }) => {
  return (
    <ThemeProvider theme = {Bavariatheme}>
      <div>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <img style={{ width: '100px', height: '100px' }} src={logo} alt="Logo" />
          </Typography>

          <Button color="inherit"
          component={Link}
          to="/Bavaria/"
          >
            Patient View
          </Button>

          <Button color="inherit"
          component={Link}
          to="/View_Study">
            View Study
          </Button>

          <Button color="inherit"
          component={Link}
          to="/Shipment_Page"
          >
            Send Sample
          </Button>

          <Button color="inherit" onClick={onLogout}>
          <img src={logoutImg} alt="Logout" style={{ width: '2em', height: '2em' }} />
      Logout
          </Button>
        </Toolbar>
      </AppBar>
      </Box>

      <Routes>
        <Route path="/Bavaria" element={<Patients_Bavaria />} />
        <Route path="/View_Study" element={<View_Study />} />
        <Route path="/Shipment_Page" element={<Shipment_Page />} />
      </Routes>
    </div>
</ThemeProvider>
  );
};

export default Navbar_Bavaria;