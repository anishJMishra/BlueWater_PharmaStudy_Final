import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  IconButton
} from "@mui/material";
import "./LoginModal.css"
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from "../firebase-config";

const LoginModal = (props) => {

  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    });

  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

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

    if (user && props.name === "FDA") {
      navigate("/FDAHome");
    }

    if (user && props.name === "Jane Hopkins") {
      navigate("/JaneHopkinsDoctor");
    }

    if (user && props.name === "Bavaria") {
      navigate("/BavariaHome");
    }
    
    // else if (props.name === "FDA") {
    //   event.preventDefault();
		// navigate("/FDA/Patients");
    // }
  };

  const logout = async () => {
    await signOut(auth);
  };

  // const handleSubmit = (event) => {
  //   if (props.name === "Jane Hopkins") {
  //     event.preventDefault();
  //     navigate("/JaneHopkinsDoctor");
  //   } else if (props.name === "Bavaria") {
  //     event.preventDefault();
  //     navigate("/BavariaHome");
  //   }
  // };

  return (
    <div className="modal">
      <IconButton
        edge="end"
        color="inherit"
        aria-label="close"
        onClick={() => {
          props.onClose();
        }}
        sx={{ position: "absolute",
              top: "10px",
              right: "10px",
              color: "#fff"
            }}
      >
        <CloseIcon />
      </IconButton>
      <Typography
        class="homePageLoginWindowTitle"
        align="center"
        variant="h3"
        fontFamily={"Raleway"}
      >
        {props.name}
      </Typography>
      <Stack
        spacing={2}
      >
        <div class="homePageLoginWindow">
          <h3> Register User </h3>
          <input class="homePageLoginWindow"
            placeholder="Username..."
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <input class="homePageLoginWindow"
            placeholder="Password..."
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />

          <button class="loginWindowButton" onClick={register}> Create User</button>
        </div>

        <div class="homePageLoginWindow">
          <h3> Login </h3>
          <input class="homePageLoginWindow"
            placeholder="Email..."
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input class="homePageLoginWindow"
            placeholder="Password..."
            type="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />

          <button class="loginWindowButton" onClick={login}> Login</button>

          <h4 class="loginConfirm"> User Logged In: </h4>
          <p class="loginConfirm"> {user ? user.email : "Not Logged In"} </p>

          <button class="signOut" onClick={logout}> Sign Out </button>
        </div>
      </Stack>
      
    </div>
  );
};

export default LoginModal;