import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import Layout from "../Layout/layout";
import emergencyimg from "../Images/emergency.png";

import styles from "../Css/home.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postApihandler } from "../Apihandler";
import Swal from "sweetalert2";
import swal from "sweetalert";

export default function EmergencyService() {
  let history = useNavigate();
  const id = useParams();
  console.log("id--->", id);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (value) => {
    console.log("value--->", value);
    const userid = localStorage.getItem("Id");
    console.log("id--->", userid);
    console.log("mechanic--->", id.id);
    const response = await postApihandler(
      `/bookMechanicForEmergencyService/${userid}/${id.id}`,
      value
    );
    console.log("response---->", response);
    if (response.status === 200) {
      Swal.fire({
        position: "middle-centre",
        icon: "success",
        title: "Booking Successfully waiting for approval",
        showConfirmButton: false,
        timer: 2000,
      });

      history("/");
    } else {
      swal("Sorry!", `${response.error.response.data.message}`, "error");
    }
  };
  return (
    <Layout>
      {/* <Typography variant="h5">Emergency Service</Typography> */}
      <Grid container sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <Grid lg={6} md={6} sm={12} sx={{ padding: "4rem" }}>
          <Typography variant="h5">Book Emergency Service</Typography>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid lg={12} xs={12} sx={{ paddingTop: "1rem" }}>
                {" "}
                <TextField
                  required
                  fullWidth
                  id="standard-basic"
                  label="Model"
                  variant="standard"
                  color="error"
                  name="car_model"
                  {...register("car_model")}
                />
              </Grid>

              <Grid lg={12} xs={12} sx={{ paddingTop: "1rem" }}>
                {" "}
                <TextField
                  required
                  fullWidth
                  id="standard-basic"
                  label="Service"
                  variant="standard"
                  color="error"
                  name="service_needed"
                  {...register("service_needed")}
                />
              </Grid>
              <Grid lg={12} xs={12} sx={{ paddingTop: "1rem" }}>
                {" "}
                <TextField
                  required
                  fullWidth
                  id="standard-multiline-static"
                  label="Description"
                  multiline
                  color="error"
                  rows={4}
                  variant="standard"
                  name="description"
                  {...register("description")}
                />
              </Grid>
              <Grid lg={12} xs={12} sx={{ paddingTop: "2rem" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="error"
                  sx={{ textTransform: "capitalize" }}
                >
                  {" "}
                  Book{" "}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid lg={6} md={6} sm={12}>
          <img src={emergencyimg} style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </Layout>
  );
}
