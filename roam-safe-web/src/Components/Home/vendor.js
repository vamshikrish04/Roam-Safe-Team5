import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../Css/home.module.css";
import vendor from "../../Images/vendor.webp";
export default function Vendor() {
  return (
    <Container maxWidth="xl" className={styles.banner_outer_container}>
      <Grid container>
        <Grid
          lg={6}
          md={6}
          sm={12}
          sx={{
            background: "#EE486A",
            display: "flex",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <div>
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                lineHeight: "33.89px",
                fontSize: "28px",
              }}
            >
              Join as a vendor
            </Typography>
            <Typography
              sx={{
                color: "white",
                lineHeight: "19.36px",
                fontSize: "16px",
                textAlign: "center",
                padding: "40px",
              }}
            >
             Boost your automotive business by becoming a vendor with Roam Safe. 
             Vendors showcase their expertise, offering services from repairs to 
             towing, while towers provide essential towing services. Join our dynamic 
             community to connect with travelers, build clientele, and contribute to a 
             safer and more convenient travel experience.
            </Typography>
            <Link to="/vendor-signup">
              <Button variant="contained" className={styles.vendor_button}>
                Mechanic
              </Button>
            </Link>
            &nbsp;&nbsp;
            <Link to="/towing-signup">
              <Button variant="contained" className={styles.vendor_button}>
                Towing
              </Button>
            </Link>
          </div>
        </Grid>
        <Grid lg={6} md={6} sm={12}>
          <img src={vendor} alt="" className={styles.vendor_img} />
        </Grid>
      </Grid>
    </Container>
  );
}
