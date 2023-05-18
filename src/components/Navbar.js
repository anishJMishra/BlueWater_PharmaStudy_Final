import React from 'react';
import logoutImg from '../assets/logout.png';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/hospital.png";
import { auth } from "../firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = ({ onLogout }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleAddPatientClick = () => {
    navigate('/JaneHopkins_AddPatients');
  };

  const handlePatientViewClick = () => {
    navigate('/JaneHopkinsDoctor'); 
  };

  const handleManageStudyClick = () => {
    navigate('/JaneHopkins_ManageStudy'); 
  };


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <AppBar position="static">
      <Toolbar>
      <img style={{ width: '100px', height: '100px' }} src={logo} alt="Logo" />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Jane Hopkins
        </Typography>
        <Typography
            sx={{pr: '10px'}} style={{textDecoration: "underline"}}
          >
            User: {user.email}
        </Typography>
        <Button color="inherit" onClick = {handlePatientViewClick}>
          Patient View
        </Button>
        <Button color="inherit" onClick={handleManageStudyClick}>
          Manage Study
        </Button>
        <Button color="inherit" onClick={handleAddPatientClick}>
          Add Patient 
        </Button>
        <Button color="inherit" onClick={onLogout}>
            <img src={logoutImg} alt="Logout" style={{ width: '2em', height: '2em' }} />
          Logout
          </Button>
      </Toolbar>
    </AppBar>
    </Box>
  );
};

export default Navbar;
