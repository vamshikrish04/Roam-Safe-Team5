import React from "react";
import Layout from "../Layout/layout";
import styles from "../Css/signup.module.css";
import { Box, Container } from "@mui/system";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { postApihandler } from "../Apihandler";
import swal from "sweetalert";

export default function Login() {
  let history = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (value) => {
    const response = await postApihandler("/UserLogin", value);
    console.log("response--->login==>", response);
    if (response.status === 200) {
      Swal.fire({
        position: "middle-centre",
        icon: "success",
        title: "Successfully Login",
        showConfirmButton: false,
        timer: 2000,
      });
      localStorage.setItem("UserName", response.data.first_name);
      localStorage.setItem("Id", response.data._id);
      localStorage.setItem("Cheak", 0);
      localStorage.setItem("Type", response.data.type);
      history("/");
    } else {
      swal("Sorry!", `${response.error.response.data.message}`, "error");
    }
  };
  return (
    <Layout>
      <Container maxWidth="xl" className={styles.banner_outer_container}>
        <div className={styles.banner_outer_div}>
          <Grid container className={styles.signup_outer_grid2}>
            <Grid lg={6} sm={12}>
              <Box
                sx={{
                  maxWidth: 450,
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
                          type="password"
                          id="standard-basic"
                          label="Password"
                          variant="standard"
                          color="error"
                          name="password"
                          {...register("password")}
                        />
                      </Grid>
                      <br />
                      <br />
                      <br />
                      <Grid lg={12} xs={12}>
                        <Typography sx={{ textAlign: "end" }}>
                          Forgot Password?
                        </Typography>
                      </Grid>
                      <br />
                      <br />
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
                          Login
                        </Button>

                        <div style={{ marginTop: "20px", textAlign: "start" }}>
                          <Typography>
                            Don’t have an account?{" "}
                            <Link to="/sign-up">Sign Up</Link>
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
