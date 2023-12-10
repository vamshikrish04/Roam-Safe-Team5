import { Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { getApihandler } from "../Apihandler";
import Layout from "../Layout/layout";
import mech from "../Images/mech.png";
import EngineeringIcon from "@mui/icons-material/Engineering";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import FactoryIcon from "@mui/icons-material/Factory";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

export default function MechanicSearch() {
  const [lat, setLat] = React.useState();
  const [long, setLong] = React.useState();
  const [mechanic, setMechanic] = React.useState([]);

  console.log("mechanic=>", mechanic);
  useEffect(() => {
    getlatLong();
  }, []);
  useEffect(() => {
    if (long !== undefined) {
      getMechanics();
    }
  }, [lat, long]);
  const getlatLong = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
    getMechanics();
  };

  const getMechanics = async () => {
    console.log("long=>", long);
    console.log("lat=>", lat);
    if (long !== undefined && lat !== undefined) {
      const response = await getApihandler(
        `/nearestMechanic/${lat}/${long}/5000`
      );
      console.log("response mechanic search-=----->", response);
      setMechanic(response);
    }
  };
  return (
    <Layout>
      <div>
        {mechanic.length !== 0 ? (
          mechanic.map((val) => {
            return (
           
                <Card
                  sx={{
                    margin: "1rem auto",
                    width: "80%",
                    boxShadow:
                      " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  }}
                >
                  <Grid container>
                    <Grid
                      lg={6}
                      md={6}
                      sm={12}
                      sx={{ textAlign: "start", padding: "1rem" }}
                    >
                      <Typography variant="h6">
                        <EngineeringIcon /> Mechanic Name :
                        <span style={{ fontSize: "18px", fontWeight: "400" }}>
                          {val.name}
                        </span>
                      </Typography>

                      <Typography variant="h6">
                        <EmailIcon /> Email Address :{" "}
                        <span style={{ fontWeight: "400" }}>{val.email}</span>
                      </Typography>
                      <Typography variant="h6">
                        <CallIcon /> Mobile no. :{" "}
                        <span style={{ fontWeight: "400" }}>
                          {val.phone_number}
                        </span>
                      </Typography>
                      <Typography variant="h6">
                        <FactoryIcon /> Company Name :{" "}
                        <span style={{ fontWeight: "400" }}>
                          {val.company_name}
                        </span>
                      </Typography>
                      <Typography variant="h6">
                        <LocationOnIcon /> Address :{" "}
                        <span style={{ fontWeight: "400" }}>{val.address}</span>
                      </Typography>
                      <Link
                        to={`/emergency-service/${val._id}`}
                        sx={{ padding: "1rem" }}
                      >
                        <Button
                          color="error"
                          variant="contained"
                          sx={{ textTransform: "capitalize" }}
                        >
                          Book Mechanic
                        </Button>
                      </Link>
                    </Grid>
                    <Grid lg={6} md={6} sm={12}>
                      <img src={mech} style={{ width: "30%" }} />
                    </Grid>
                  </Grid>
                </Card>
              
            );
          })
        ) : (
          <h3>No data found</h3>
        )}
      </div>
    </Layout>
  );
}
