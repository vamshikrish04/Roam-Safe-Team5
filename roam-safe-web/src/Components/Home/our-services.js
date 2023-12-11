import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import styles from "../../Css/home.module.css";
import truck from "../../Images/tow-truck.png";
import mechanic from "../../Images/mechanic.png";
import battery from "../../Images/battery.png";

export default function OurServices() {
  return (
    <Container maxWidth="xl" sx={{ padding: "20px" }}>
      <div>
        <h1>Our Services</h1>
        <Grid container>
          <Grid lg={4} md={4} sm={12} className={styles.ourservice_card_grid}>
            <img src={truck} className={styles.our_service_img} alt="" />
            <Typography sx={{ fontWeight: "600", fontSize: "24px" }}>
              Car Towing
            </Typography>
            <Typography>
            Roam Safe ensures swift and hassle-free car towing, providing prompt assistance 
            when you need it the most. Our transparent and efficient service offers secure 
            payments and clear quotations based on distance traveled, allowing you to 
            navigate unexpected automotive challenges with ease. Trust Roam Safe for a 
            seamless towing experience, getting you back on the road with confidence.
            </Typography>
          </Grid>
          <Grid lg={4} md={4} sm={12} className={styles.ourservice_card_grid}>
            <img src={mechanic} className={styles.our_service_img} alt="" />
            <Typography sx={{ fontWeight: "600", fontSize: "24px" }}>
              Mechanic
            </Typography>
            <Typography>
            Experience excellence with Roam Safe Mechanics. Our skilled professionals offer 
            seamless repairs and diagnostics for your vehicle's needs. From routine
            maintenance to urgent fixes, expect expert service, transparent communication, 
            and live request tracking.Trust Roam Safe Mechanics for top-tier automotive care.
            </Typography>
          </Grid>
          <Grid lg={4} md={4} sm={12}  className={styles.ourservice_card_grid}>
            <img src={battery} className={styles.our_service_img} alt="" />
            <Typography sx={{ fontWeight: "600", fontSize: "24px" }}>
             Regular Service
            </Typography>
            <Typography>
            Experience hassle-free car maintenance with Roam Safe. Our expert services 
            cover everything from routine check-ups to meticulous inspections. 
            Trust us to keep your vehicle performing at its best, with scheduled appointments, 
            clear communication, and a dedication to ensuring your car stays in top shape.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
