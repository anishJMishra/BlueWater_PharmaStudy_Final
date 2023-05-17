import React, { useState, useEffect } from "react";
import { Box, Modal, Stack, IconButton } from "@mui/material";
import "./LoginModal.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from "../firebase-config";
import "./LoginModal.css";
import background from "../assets/background.jpeg";

const LoginModal = (props) => {

  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    });

  }, []);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }

    const allowedDomains = ['fda.com', 'janehopkins.com', 'bavaria.com'];

    const detectedEmail = loginEmail.split('@')[1];

    if (allowedDomains.includes(detectedEmail)) {
      if (detectedEmail === 'fda.com') {
        navigate("/FDAHome");
      }
      else if (detectedEmail === 'janehopkins.com') {
        navigate("/JaneHopkinsDoctor");
      }
      else if (detectedEmail === 'bavaria.com') {
        navigate("/Bavaria");
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const { onClose } = props;

  return (
    <div className="modal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Modal
        open = {true} onClose = {onClose}
        sx={{
          color:"white"
        }}
      >
        <Box
          align = "center"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            borderStyle: 'solid',
            borderColor: '#003987',
            margin: 'auto', // Updated margin value
          }}
        >

          <IconButton
            edge="end"
            color="inherit"
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "#fff"
                }}
          >
            <CloseIcon />
          </IconButton>
          <Stack
            spacing={2}
          >
            <Stack>
              <div>
                <h2> Login </h2>


                <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '1em' }}>Email:</h2>


                <input
                  style={{ padding: '8px', borderRadius: '5px' }}
                  placeholder="Email..."
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
              </div>


                <p></p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
  <h2 style={{ marginRight: '1em' }}>Password:</h2>
  <input
    style={{ padding: '8px', borderRadius: '5px' }}
    placeholder="Password..."
    type="password"
    onChange={(event) => {
      setLoginPassword(event.target.value);
    }}
  />
</div>

                <button onClick={login} style={{padding: "1em", borderRadius: "5px", backgroundColor: "#003987", color: "white"}}> Login</button>
              </div>

             {/* <h4>Current User Logged In: </h4>
              {user ? user.email : "Not Logged In"}*/} 
              
              {user && (
  <div>
    <h4>Logged In:</h4>
    <span>{user.email}</span>
  </div>
)}
{!user && <h4>Not Logged In</h4>}

              <button onClick={logout}> Sign Out </button>
            </Stack>
          </Stack>
        </Box>   
      </Modal>
    </div>
  );
};

export default LoginModal;

// if (user && props.name === "FDA") {
    //   navigate("/FDAHome");
    // }

    // if (user && props.name === "Jane Hopkins") {
    //   navigate("/JaneHopkinsDoctor");
    // }

    // if (user && props.name === "Bavaria") {
    //   navigate("/BavariaHome");
    // }
    
    // else if (props.name === "FDA") {
    //   event.preventDefault();
		// navigate("/FDA/Patients");
    // }