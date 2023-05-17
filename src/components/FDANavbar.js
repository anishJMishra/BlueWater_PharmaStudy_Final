import React from 'react';
import { ThemeProvider, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import FDAIcon from "../assets/fda-logo.jpeg";
import FDAtheme from "../themes/FDAtheme";
import logoutImg from '../assets/logout.png';
import {Link} from 'react-router-dom';
import { auth } from "../firebase-config";
import { useAuthState } from 'react-firebase-hooks/auth';

const FDANavbar = ({ onLogout }) => {
  const [user] = useAuthState(auth);

  return (
	<ThemeProvider theme = {FDAtheme}>
    <Box backgroundColor = "primary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <AppBar position="static">
      <Toolbar>
      <Typography variant = "h6" sx={{flexGrow: 1}}>
		    <img style={{ width: '100px', height: '100px' }}src={FDAIcon} alt="Logo" />
      </Typography>
      <Typography
            sx={{pr: '10px'}}
          >
            User: {user.email}
        </Typography>
        <Button component={Link} to = "/FDA/Patients" color="inherit">
              Patients
        </Button>
        <Button component={Link} to = "/FDA/Drugs" color="inherit">
            Assign Drugs 
        </Button>
        <Button component={Link} to = "/FDA/Study" color="inherit">
            View Study
        </Button>
            <Button color="inherit" onClick={onLogout}>
            <img src={logoutImg} alt="Logout" style={{ width: '2em', height: '2em' }} />
          Logout
        </Button>
      </Toolbar>
    </AppBar>
    </Box>
	</ThemeProvider>
  );
};

export default FDANavbar;
