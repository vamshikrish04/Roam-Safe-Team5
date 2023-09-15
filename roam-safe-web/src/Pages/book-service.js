import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import Layout from "../Layout/layout";
import emergencyimg from "../Images/emergency.png";

// import styles from "../Css/home.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postApihandler } from "../Apihandler";
import Swal from "sweetalert2";
import swal from "sweetalert";

export default function BookService() {
  let history = useNavigate();
  const id = useParams();
  // console.log("id--->",id);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (value) => {
    console.log("value--->",value);
    const userid = localStorage.getItem("Id");
    //  console.log("id--->", userid);
    //  console.log("mechanic--->", id.id);
    const response = await postApihandler(
      `/bookMechanic/${userid}/${id.id}`,
      value
    );
    //  console.log("response---->",response);
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
          <Typography variant="h5">Book Service</Typography>
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid lg={12} xs={12} sx={{ paddingTop: "1rem" }}>
                {" "}
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="date"
                  variant="outlined"
                  label="Select date"
                  InputLabelProps={{ shrink: true }}
                  // sx={{ mt: 2, minWidth: { lg: 214, xs: 435 } }}
                  name="date"
                  {...register("date")}
                />
              </Grid>

              <Grid lg={12} xs={12} sx={{ paddingTop: "1rem" }}>
                {" "}
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="time"
                  variant="outlined"
                  label="Select time"
                  InputLabelProps={{ shrink: true }}
                  // sx={{ mt: 2, minWidth: { lg: 214, xs: 435 } }}
                  name="time"
                  {...register("time")}
                />
              </Grid>

              <Grid lg={12} xs={12} sx={{ paddingTop: "1rem" }}>
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
                  id="standard-multiline-static"
                  label="Issues"
                  multiline
                  color="error"
                  rows={4}
                  variant="standard"
                  name="issue_in_car"
                  {...register("issue_in_car")}
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
