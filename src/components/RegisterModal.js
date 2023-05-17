import React, { useState, useEffect } from "react";
import { Box, Modal, Stack, IconButton } from "@mui/material";
import "./LoginModal.css";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase-config";

const RegisterModal = (props) => {

    const navigate = useNavigate();

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        });

    }, []);

    useEffect(() => {
      if (showModal) {
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
      }
    }, [showModal]);


    const register = async () => {

      const prohibitedDomains = ['gmail.com','yahoo.com', 'hotmail.com'];

      const detectedEmail = registerEmail.split('@')[1];

      if (prohibitedDomains.includes(detectedEmail)) {
        setErrorMessage('Invalid domain in user. Please try again.');
        setSuccessMessage('');
      } else {
        const user = await createUserWithEmailAndPassword(
                  auth,
                  registerEmail,
                  registerPassword
              );
        console.log(user);

        setSuccessMessage('Account registered successfully. Proceed by logging in.');
        setErrorMessage('');
        // if (detectedEmail === 'fda.com') {
        //   navigate("/FDAHome");
        // }
        // else if (detectedEmail === 'janehopkins.com') {
        //   navigate("/JaneHopkinsDoctor");
        // }
        // else if (detectedEmail === 'bavaria.com') {
        //   navigate("/BavariaHome");
        // }
      }
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
                    <h2> Register User </h2>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '1em' }}>New Email:</h2>
                    <input
                    style={{ padding: '8px', borderRadius: '5px' }}
                        placeholder="Email..."
                        onChange={(event) => {
                        setRegisterEmail(event.target.value);
                        }}
                    />
</div>


<div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '1em' }}>New Password:</h2>
                    <input
                    style={{ padding: '8px', borderRadius: '5px' }}
                        placeholder="Password..."
                        type="password"
                        onChange={(event) => {
                        setRegisterPassword(event.target.value);
                        }}
                    />
</div>

                    <button onClick={register} style={{padding: "1em", borderRadius: "5px", backgroundColor: "#003987", color: "white"}}> Create User</button>
                </div>

                {/* <Modal isOpen={showModal}>
                  <h2>{user ? successMessage : errorMessage}</h2>
                </Modal> */}

                {/* <h4> Register a user above. After doing so,
                proceed to Login window to access pages. </h4> */}
                <h2>{user ? successMessage : errorMessage}</h2>
            </Stack>
          </Stack>
        </Box>   
      </Modal>
        
        </div>
  );
}

export default RegisterModal