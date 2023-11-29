import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import doctorimage from "../../Images/Signup/doctorsignup.jpg";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/layout";
import vendor from "../Images/vendor.webp";

import { postApihandler } from "../Apihandler";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import swal from "sweetalert";

const theme = createTheme();

export default function VendorLogin() {
  let history = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (value) => {
    const response = await postApihandler("/mechanicLogin", value);
    console.log("response==>", response);
    if (response.status === 200) {
      Swal.fire({
        position: "middle-centre",
        icon: "success",
        title: "Successfully Login",
        showConfirmButton: false,
        timer: 2000,
      });
      localStorage.setItem("UserName", response.data.name);
      localStorage.setItem("Id", response.data._id);
      localStorage.setItem("Cheak", 1);
      localStorage.setItem("Type", response.data.type);
      history("/");
    } else if (response.status === 202) {
      swal("Sorry!", `${response.message}`, "error");
    } else {
      swal("Sorry!", `${response.error.response.data.message}`, "error");
    }
  };
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{}}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
              backgroundImage: "url(" + vendor + ")",
              backgroundRepeat: "no-repeat",

              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
            sx={{ background: "white" }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "75%",
                margin: "64px auto",
                paddingTop: "2rem",
                paddingBottom: "10rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "black", fontWeight: "600" }}
              >
                Vendor Login
              </Typography>
              <Box sx={{ mt: 1 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    color="error"
                    name="email"
                    {...register("email")}
                  />

                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    color="error"
                    name="password"
                    {...register("password")}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="error"
                    sx={{
                      mt: 3,
                      mb: 2,

                      color: "white",
                    }}
                  >
                    Login
                  </Button>
                </form>
                <Typography sx={{ color: "black" }}>
                  Don't have an account?{" "}
                  <Link
                    to="/vendor-signup"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Sign up
                  </Link>
                </Typography>{" "}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  );
}
