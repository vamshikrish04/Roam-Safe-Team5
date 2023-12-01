import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../Layout/layout";
import Imges from "../Images/profile.jpg";
import { getApihandler } from "../Apihandler";
import { useForm } from "react-hook-form";
export default function MyProfile() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [getType,setgetType]= useState("")
  useEffect(() => {
     const Type = localStorage.getItem("Type");
setgetType(Type);
    getInfo();
  }, []);
  const getInfo = async () => {
    const Type = localStorage.getItem("Type");
    const Id = localStorage.getItem("Id");
    console.log("--->", Type);
    console.log("--->", Id);
    const res =
      Type === "User"
        ? await getApihandler(`/getUserInfo/${Id}`)
        : Type === "Mechanic"
        ? await getApihandler(`/getMechanicInfo/${Id}`)
        : Type === "Towing"
        ? await getApihandler(`/getTowingInfo/${Id}`)
        : "";
    console.log("res-->", res);

    if (res.status === 200) {
        if (Type === "User") {
          setValue("first_name", res.data.first_name);
          setValue("userEmail", res.data.userEmail);
          setValue("phone_number", res.data.phone_number);
        } else if (Type === "Mechanic") {
          setValue("name", res.data.name);
          setValue("email", res.data.email);
          setValue("phone_number", res.data.phone_number);
          setValue("address", res.data.address);
          setValue("company_name", res.data.company_name);
        } else if (Type === "Towing") {
          setValue("name", res.data.name);
          setValue("email", res.data.email);
          setValue("phone_number", res.data.phone_number);
          setValue("address", res.data.address);
          setValue("company_name", res.data.company_name);
        }
       
     
    }
  };
  return (
    <Layout>
      <h1>MyProfile</h1>
      <Grid container>
        <Grid lg={6}>
          <img src={Imges} style={{ width: "50%" }} />
        </Grid>
        <Grid lg={4}>
          {getType === "User" ? (
            <form>
              <Typography sx={{ textAlign: "start" }}>Name</Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Name"
                variant="standard"
                name="first_name"
                {...register("first_name")}
              />
              <Typography sx={{ textAlign: "start", paddingTop: "10px" }}>
                Email
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Email"
                variant="standard"
                name="userEmail"
                {...register("userEmail")}
              />
              <Typography sx={{ textAlign: "start", paddingTop: "10px" }}>
                Mobile No.
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Mobile no."
                variant="standard"
                name="phone_number"
                {...register("phone_number")}
              />
              {/* <Button variant="contained" size="small" sx={{ marginY: "20px" }}>
                Save
              </Button> */}
            </form>
          ) : getType === "Mechanic" ? (
            <form>
              <Typography sx={{ textAlign: "start" }}>Name</Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Name"
                variant="standard"
                name="name"
                {...register("name")}
              />
              <Typography sx={{ textAlign: "start", paddingTop: "10px" }}>
                Email
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Email"
                variant="standard"
                name="email"
                {...register("email")}
              />
              <Typography sx={{ textAlign: "start", paddingTop: "10px" }}>
                Mobile No.
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Mobile no."
                variant="standard"
                name="phone_number"
                {...register("phone_number")}
              />
              <Typography sx={{ textAlign: "start", paddingTop: "10px" }}>
                Address
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Mobile no."
                variant="standard"
                name="address"
                {...register("address")}
              />
              <Typography sx={{ textAlign: "start", paddingTop: "10px" }}>
                Company Name
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Mobile no."
                variant="standard"
                name="company_name"
                {...register("company_name")}
              />
              {/* <Button variant="contained" size="small" sx={{ marginY: "20px" }}>
                Save
              </Button> */}
            </form>
          ) : getType === "Towing" ? (
            <form>
              <Typography sx={{ textAlign: "start" }}>Name</Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Name"
                variant="standard"
                name="name"
                {...register("name")}
              />
              <Typography sx={{ textAlign: "start", paddingTop: "10px" }}>
                Email
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Email"
                variant="standard"
                name="email"
                {...register("email")}
              />
              <Typography sx={{ textAlign: "start", paddingTop: "10px" }}>
                Mobile No.
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Mobile no."
                variant="standard"
                name="phone_number"
                {...register("phone_number")}
              />
              <Typography sx={{ textAlign: "start", paddingTop: "10px" }}>
                Address
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Mobile no."
                variant="standard"
                name="address"
                {...register("address")}
              />
              <Typography sx={{ textAlign: "start", paddingTop: "10px" }}>
                Company Name
              </Typography>
              <TextField
                fullWidth
                id="standard-basic"
                placeholder="Mobile no."
                variant="standard"
                name="company_name"
                {...register("company_name")}
              />
              {/* <Button variant="contained" size="small" sx={{ marginY: "20px" }}>
                Save
              </Button> */}
            </form>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}
