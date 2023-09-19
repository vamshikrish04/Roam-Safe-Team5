import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../Images/loginpage.jpg";
import { useForm } from "react-hook-form";
import { postLoginApi } from "../Apihandler";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import swal from "sweetalert";



const defaultTheme = createTheme();

export default function LoginPage() {
    let history = useNavigate();
    // ........useform......./////
  const { register, handleSubmit } = useForm();
  //...........useState.......//////

///...........api call........///
  const onSubmit = async (value) => {
    //  console.log("value==>", value);
    const response = await postLoginApi("/adminLogin", value);
    console.log("response-->", response);
     if (response.status === 200) {
       Swal.fire({
         position: "middle-centre",
         icon: "success",
         title: "Successfully login",
         showConfirmButton: false,
         timer: 2000,
       });
      history("/users");
     } else {
       swal("Sorry!", `${response.error.response.data.message}`, "error").then(
         (value) => {
          
         }
       );
     }


  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ display: "flex", justifyContent: "space-around" }}
        >
          <Box
            sx={{
              my: 16,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "80%",
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon color="warning" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="adminEmail"
                autoComplete="email"
                autoFocus
                color="warning"
                {...register("adminEmail")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="warning"
                {...register("password")}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{ mt: 3, mb: 2 }}
              >
                LogIn
              </Button>
             
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <img alt="loginimage" style={{ width: "100%" }} src={logo} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
