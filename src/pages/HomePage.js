import React from 'react';
import { Stack, Typography } from "@mui/material";
import TopBanner from '../components/TopBanner';
import LoginAndRegisterButtons from '../components/LoginAndRegisterButtons';
import gif from '../assets/test1.gif';
import logo from '../assets/blueWater_Logo.png';
import ocean from '../assets/ocean.gif';

const HomePage = () => {
  return (
    <div style={{ height: "100vh", backgroundColor: "black"}} className="App">
      {/*<TopBanner/>*/}
        <Typography
          sx = {{
            pt: 10,
            fontFamily: "Raleway"
          }}
          align = "center"
          variant = "h4"
        >

         {

         <h1 style={{color: "white"}}>
              Blue Water Study

          </h1>
         } 

          {/*<p>
          User: nsanchez1@fda.com, Password: Ironiciron54!
          User: nsanchez1@janehopkins.com, Password: Ironiciron53!
          User: nsanchez1@bavaria.com, Password: Ironiciron52!
        </p>*/}
        </Typography>
      <Stack sx={{ pt: 10 }}
        direction = "row"
        justifyContent= "center"
        spacing = {7.5}
      >

        <div>
          <img src={logo} style={{height: "35em"}}></img>
          <LoginAndRegisterButtons />
        </div>
       
        {/* <OrganizationButtons name = "FDA" logo = {FDAIcon} />
        <OrganizationButtons name = "Jane Hopkins" logo = {JHIcon} />
        <OrganizationButtons name = "Bavaria" logo = {BavariaIcon} /> */}
        {/* <OrganizationButtons name = "Login" />
        <OrganizationButtons name = "Register" /> */}

      </Stack>
    </div>
  )
}

export default HomePage;

/*<AppBar position="static">
<Toolbar variant="dense">
<IconButton
  edge="start"
  color="inherit"
  aria-label="menu"
  sx={{ mr: 2 }}
></IconButton>
<Typography variant="h2" color="inherit" component="div">
  PharmaStudy
</Typography>
    {/* <div style={{ position: "relative", top: "120px", right: "350px" }}>
  <Button variant="contained" onClick={() => addPatient()}>
    Add Patient
  </Button>
</div> **}
</Toolbar>
</AppBar>
*/
