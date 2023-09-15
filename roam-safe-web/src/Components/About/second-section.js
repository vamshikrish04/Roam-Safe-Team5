import { Grid, Typography } from '@mui/material';
import React from 'react';
import Images1 from "../../Images/about-2.webp";
import styles from "../../Css/about.module.css";

export default function SecondSection() {
  return (
    <div>
      <Typography sx={{ paddingTop: "10px", fontSize: "2rem" }}>
        About Us
      </Typography>
      <Grid container sx={{ padding: "1rem" }}>
        <Grid lg={6} md={6} xs={12}>
          <Typography className={styles.about_second_section_text}>
          At Roam Safe, we're more than just a service – we're your trusted companion 
          on the road. Our mission is to redefine your travel experience by providing 
          seamless access to top-tier automotive expertise. Committed to prioritizing 
          safety and convenience, we offer swift roadside assistance, efficient towing, 
          and expert diagnostics. <br />
          <br />
          Built on the foundation of community and collaboration, Roam Safe is not just 
          a platform; it's a shared journey toward hassle-free travel. From customer-friendly 
          features to our network of skilled professionals, every aspect of Roam Safe reflects 
          our dedication to making every journey safer and more convenient. Join us as we 
          pave the way for a new era of automotive assistance, where your peace of mind is
          our priority. Welcome to Roam Safe – your partner in every mile.
          </Typography>
        </Grid>
        <Grid lg={6} md={6} xs={12}>
          <img src={Images1} className={styles.about_second_section_img} />
        </Grid>
      </Grid>
    </div>
  );
}
