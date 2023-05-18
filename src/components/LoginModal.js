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
import "./LoginModal.css"

const LoginModal = (props, { onLogin }) => {

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
      const detectedEmail = loginEmail.split('@')[1];

      if (detectedEmail === 'fda.com') {
          navigate("/FDA/Patients");
      }
      else if (detectedEmail === 'janehopkins.com') {
        navigate("/JaneHopkinsDoctor");
      }
      else if (detectedEmail === 'bavaria.com') {
        navigate("/Bavaria");
      }

    } catch (error) {
      console.log(error.message);
    }   
  };

  const logout = async () => {
    await signOut(auth);
  };

  const { onClose } = props;

  return (
    <div className="modal">
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
              // height: '50vh', // Sets the height of the Box to 100% of the viewport height
              width: '100vw',
              borderStyle: "solid",
              borderColor: "#003987",
              backgroundColor: "blue",
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
                <input
                  placeholder="Email..."
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
                <input
                  placeholder="Password..."
                  type="password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />

                <button onClick={login}> Login</button>
              </div>

              <h4>Current User Logged In: </h4>
              {user ? user.email : "Not Logged In"}

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
