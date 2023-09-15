import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import doctorimage from "../../Images/Signup/doctorsignup.jpg";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/layout";
import vendor from "../Images/towing.jpg";
import { getApihandler, postApihandler } from "../Apihandler";
import styles from "../Css/signup.module.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import swal from "sweetalert";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const theme = createTheme();

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function TowingSignup() {
  let history = useNavigate();
  const { register, handleSubmit, reset, watch } = useForm();
  const [lat, setLat] = React.useState();
  const [long, setLong] = React.useState();
  const [personName, setPersonName] = React.useState([]);
  console.log("personName===>", personName);
  const [services, setServices] = React.useState([]);
  const file = watch("licence");
  const file1 = watch("store_paper");
  const file2 = watch("document");

  React.useEffect(() => {
    getlatLong();
    getServices();
  }, []);

  const getlatLong = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };
  const getServices = async () => {
    const response = await getApihandler("/getServicesNameOnly");
    console.log("response-->", response);
    if (response.status === 200) {
      setServices(response.data);
    }
  };
  const handleChange = (event) => {
    console.log("event-->", event.target.value);
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  const onSubmit = async (value) => {
    const formData = new FormData();
    console.log("values-->", value);
    const {
      name,
      email,
      phone_number,
      company_name,
      address,
      password,
      confirmPassword,
    } = value;

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone_number", phone_number);
    formData.append("company_name", company_name);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("latitude", lat);
    formData.append("longitude", long);
    formData.append("licence", file[0]);
    formData.append("store_paper", file1[0]);
    formData.append("document", file2[0]);

    const response = await postApihandler("/towingProviderSignUP", formData);
    console.log("response===>", response);

    if (response.status === 200) {
      Swal.fire({
        position: "middle-centre",
        icon: "success",
        title: "Successfully Signup",
        showConfirmButton: false,
        timer: 2000,
      });
      history("/towing-login");
    } else {
      swal("Sorry!", `${response.error.response.data.message}`, "error");
    }
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Grid container component="main">
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
            sx={{
              background: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "75%",
                margin: "30px auto",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "black", fontWeight: "600" }}
              >
                Towing Signup
              </Typography>

              <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "2rem",
                    }}
                  >
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Full Name"
                      variant="standard"
                      color="error"
                      name="name"
                      {...register("name")}
                    />
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Mobile No."
                      variant="standard"
                      color="error"
                      name="phone_number"
                      {...register("phone_number")}
                    />
                  </div>

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
                    label="Address"
                    variant="standard"
                    color="error"
                    name="address"
                    {...register("address")}
                  />
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Company Name"
                    variant="standard"
                    color="error"
                    name=""
                    {...register("company_name")}
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
                  <TextField
                    fullWidth
                    id="standard-basic"
                    label="Confirm Password"
                    variant="standard"
                    color="error"
                    name="confirmPassword"
                    {...register("confirmPassword")}
                  />
                  <div style={{ textAlign: "start" }}>
                    <Typography>Licence</Typography>
                    <input
                      type="file"
                      name="licence"
                      {...register("licence")}
                    />
                    <Typography>Store paper</Typography>
                    <input
                      type="file"
                      name="store_paper"
                      {...register("store_paper")}
                    />
                    <Typography>Document</Typography>
                    <input
                      type="file"
                      name="document"
                      {...register("document")}
                    />
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <FormControlLabel
                      sx={{ color: "black" }}
                      control={
                        <Checkbox
                          value="remember"
                          sx={{ color: "black" }}
                          color="error"
                        />
                      }
                      label="I accept terms & conditions"
                    />
                  </Box>
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
                    Sign Up
                  </Button>
                </form>
                <Typography sx={{ color: "black" }}>
                  Already have an account?{" "}
                  <Link
                    to="/towing-login"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Log In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Layout>
  );
}
