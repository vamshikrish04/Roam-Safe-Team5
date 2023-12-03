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
import logo from "../Images/contact.jpg";
import { useForm } from "react-hook-form";
import { postApihandler, postLoginApi } from "../Apihandler";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import swal from "sweetalert";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import Layout from "../Layout/layout";

const defaultTheme = createTheme();

export default function LoginPage() {
  const [type, setType] = React.useState("");
  let history = useNavigate();
  React.useEffect(() => {
    const Type = localStorage.getItem("Type");
    setType(Type);
  }, []);
  const handleOpen = () => {
    const id = localStorage.getItem("Id");
    if (id) {
      history("/chat-user-admin");
    } else {
      alert("Please log in first");
    }
  };
  // ........useform......./////
  const { register, handleSubmit, reset } = useForm();
  //...........useState.......//////

  ///...........api call........///
  const onSubmit = async (value) => {
    console.log("value==>", value);
    const response = await postApihandler("/addContactForm", value);
    console.log("response-->", response);
    if (response.status === 200) {
      Swal.fire({
        position: "middle-centre",
        icon: "success",
        title: "Successfully add contact",
        showConfirmButton: false,
        timer: 2000,
      });
      reset();
    } else {
      swal("Sorry!", `${response.error.response.data.message}`, "error").then(
        (value) => {}
      );
    }
  };

  return (
    <Layout>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />

          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <img alt="loginimage" style={{ width: "100%" }} src={logo} />
          </Grid>
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
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Avatar sx={{ m: 1 }}>
                <PermContactCalendarIcon color="warning" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Contact Us
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
                <TextField
                  required
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoFocus
                  color="warning"
                  {...register("name")}
                />
                <TextField
                  required
                  variant="standard"
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                  color="warning"
                  {...register("email")}
                />
                <TextField
                  required
                  variant="standard"
                  margin="normal"
                  fullWidth
                  name="mobile_no"
                  label="Mobile no."
                  type="number"
                  id="mobile_no"
                  color="warning"
                  {...register("mobile_no")}
                />
                <TextField
                  required
                  variant="standard"
                  margin="normal"
                  fullWidth
                  name="message"
                  label="Message"
                  color="warning"
                  {...register("message")}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="warning"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
              {type === "User" ? (
                <Link to="/chat-user-admin">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleOpen}
                  >
                    Chat with Admin
                  </Button>
                </Link>
              ) : type === "Mechanic" ? (
                <Link to="/chat-mechanic-admin">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleOpen}
                  >
                    Chat with Admin
                  </Button>
                </Link>
              ) : type === "Towing" ? (
                <Link to="/chat-towing-admin">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleOpen}
                  >
                    Chat with Admin
                  </Button>
                </Link>
              ) : (
                ""
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  );
}
