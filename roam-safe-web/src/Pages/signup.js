import React from "react";
import Layout from "../Layout/layout";
import styles from "../Css/signup.module.css";
import { Box, Container } from "@mui/system";
import { Button, Checkbox, Grid, TextField, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { postApihandler } from "../Apihandler";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function Signup() {
  let history = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [lat, setLat] = React.useState();
  const [long, setLong] = React.useState();

  React.useEffect(() => {
    getlatLong();
  }, []);
  const getlatLong = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };
  const onSubmit = async (value) => {
    console.log("values-->", value);
    const { first_name, last_name, phone_number, userEmail, password } = value;
    const array = {
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      userEmail: userEmail,
      password: password,
      latitude: lat,
      longitude: long,
    };
    console.log("array------>", array);
    const response = await postApihandler("/userSignUP", array);
    console.log("response===>", response);

    if (response.status === 200) {
      Swal.fire({
        position: "middle-centre",
        icon: "success",
        title: "Successfully Signup",
        showConfirmButton: false,
        timer: 2000,
      });
      history("/login");
    } else {
      swal("Sorry!", `${response.error.response.data.message}`, "error");
    }
  };
  return (
    <Layout>
      <Container maxWidth="xl" className={styles.banner_outer_container}>
        <div className={styles.banner_outer_div}>
          <Grid container className={styles.signup_outer_grid}>
            <Grid lg={6} sm={12}>
              <Box
                sx={{
                  maxWidth: 500,
                  background: "white",
                  padding: "0rem",
                  borderRadius: "10px",
                }}
              >
                <div style={{ padding: "2rem" }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                      container
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gridRowGap: "10px",
                      }}
                    >
                      <Grid lg={5} xs={12}>
                        <TextField
                          fullWidth
                          id="standard-basic"
                          type="text"
                          label="First Name"
                          variant="standard"
                          color="error"
                          name="first_name"
                          {...register("first_name")}
                        />
                      </Grid>
                      <Grid lg={5} xs={12}>
                        {" "}
                        <TextField
                          fullWidth
                          type="text"
                          id="standard-basic"
                          label="Last Name"
                          variant="standard"
                          color="error"
                          name="last_name"
                          {...register("last_name")}
                        />
                      </Grid>
                      <Grid lg={12} xs={12}>
                        {" "}
                        <TextField
                          fullWidth
                          type="number"
                          id="standard-basic"
                          label="Mobile Number"
                          variant="standard"
                          color="error"
                          name="phone_number"
                          {...register("phone_number")}
                        />
                      </Grid>
                      <Grid lg={12} xs={12}>
                        {" "}
                        <TextField
                          fullWidth
                          type="email"
                          id="standard-basic"
                          label="Email"
                          variant="standard"
                          color="error"
                          name="userEmail"
                          {...register("userEmail")}
                        />
                      </Grid>
                      <Grid lg={12} xs={12}>
                        {" "}
                        <TextField
                          fullWidth
                          id="standard-basic"
                          label="Password"
                          variant="standard"
                          color="error"
                          name="password"
                          {...register("password")}
                        />
                      </Grid>
                      <Grid lg={12} xs={12} sx={{ textAlign: "start" }}>
                        <Typography>
                          <Checkbox
                            {...label}
                            sx={{
                              color: red[800],
                              "&.Mui-checked": {
                                color: red[600],
                              },
                            }}
                          />
                          By Signup I am agree with terms and conditions
                        </Typography>
                      </Grid>
                      <Grid lg={12} xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="error"
                          sx={{
                            paddingLeft: "25px",
                            paddingRight: "25px",
                            textTransform: "capitalize",
                          }}
                        >
                          Sign Up
                        </Button>

                        <div style={{ marginTop: "20px", textAlign: "start" }}>
                          <Typography>
                            Already have an account?{" "}
                            <Link to="/login">Login</Link>
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Box>
            </Grid>
            <Grid lg={6} sm={0}></Grid>
          </Grid>
        </div>
      </Container>
    </Layout>
  );
}
