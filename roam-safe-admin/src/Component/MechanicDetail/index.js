import React from "react";
import AdminLayout from "../../Layout";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getApihandler } from "../../Apihandler";
import { Card, Grid } from "@mui/material";
import mech from "../../Images/mechanic.png";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function MechanicDetail() {
  // useState
  const [data, setData] = React.useState({});
  const [services, setServices] = React.useState([]);
  const { id } = useParams();

  useEffect(() => {
    getMechanicDetail();
  }, []);
  const getMechanicDetail = async () => {
    const response = await getApihandler(`/getAllMechanic/id_${id}`);
    console.log("getMech===>", response.data[0]);
    setData(response.data[0]);
    setServices(response.data[0].service_provided);
  };
  return (
    <AdminLayout>
      <h1>Mechanic Detail</h1>
      <Card>
        <Grid container>
          <Grid lg={12} md={12} sm={12}>
            <div style={{ paddingTop: "30px", paddingBottom: "30px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem",
                  gap: "20px",
                }}
              >
                <PersonIcon sx={{ fontSize: "2rem" }} />
                <Typography>{data.name}</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem",
                  gap: "20px",
                }}
              >
                <MailIcon sx={{ fontSize: "2rem" }} />
                <Typography>{data.email}</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem",
                  gap: "20px",
                }}
              >
                <CallIcon sx={{ fontSize: "2rem" }} />
                <Typography>{data.phone_number}</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem",
                  gap: "20px",
                }}
              >
                <ApartmentIcon sx={{ fontSize: "2rem" }} />
                <Typography>{data.company_name}</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.5rem",
                  gap: "20px",
                }}
              >
                <LocationOnIcon sx={{ fontSize: "2rem" }} />
                <Typography>{data.address}</Typography>
              </div>
              <div>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Services</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {services.map((val, index) => {
                      return (
                        <Typography sx={{ textAlign: "start" }}>
                          {index + 1}. {val.serviceName}
                        </Typography>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </div>
            </div>
          </Grid>
          <Grid lg={12} md={0} sm={0}>
            <Typography variant="h5" sx={{ textAlign: "start" }}>
              Licence
            </Typography>
            <img
              src={`https://roamsafe.s3.amazonaws.com/${data.licence}`}
              alt=""
              width={300}
            />
            <Typography variant="h5" sx={{ textAlign: "start" }}>
              Document
            </Typography>
            <img
              src={`https://roamsafe.s3.amazonaws.com/${data.document}`}
              alt=""
              width={300}
            />
            <Typography variant="h5" sx={{ textAlign: "start" }}>
              Store Paper
            </Typography>
            <img
              src={`https://roamsafe.s3.amazonaws.com/${data.store_paper}`}
              alt=""
              width={300}
            />
          </Grid>
        </Grid>
      </Card>
    </AdminLayout>
  );
}
