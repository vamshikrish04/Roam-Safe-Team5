import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
// import navlogo from "../../images/navlogo.jpg";
import styles from "../../Css/footer.module.css";
import React from "react";
import { Link } from "react-router-dom";
const Tabs = [
  { name: "Home", url: "/" },
  { name: "About", url: "#" },
  { name: "How it Work", url: "#" },
  { name: "Contact", url: "#" },
];
const Icon = [
  { icon: <FacebookIcon color="" sx={{ fontSize: "2.5rem" }} /> },
  { icon: <InstagramIcon color="" sx={{ fontSize: "2.5rem" }} /> },
  { icon: <TwitterIcon color="" sx={{ fontSize: "2.5rem" }} /> },
];
export default function Footer() {
  return (
    <Container className={styles.footer_outer_container} maxWidth="xl">
      <Grid container className={styles.footer_gridcontainer_div}>
        <Grid md={3} xs={12} sm={3}>
          {/* <img
            className={styles.footer_img}
            src={navlogo}
            alt="Drdaleel logo"
          /> */}
          <Typography
            variant="h5"
            sx={{
              // display: { xs: "none", md: "flex" },
              color: "black",
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            Roam Safe
          </Typography>
        </Grid>
        <Grid md={6} xs={12} sm={6}>
          <Typography className={styles.footer_upper_tabtext} variant="h6">
            Company
          </Typography>
          <div>
            {Tabs.map((tab) => {
              return (
                <div style={{ paddingTop: "10px" }}>
                  <Link to={tab.url} style={{ textDecoration: "none" }}>
                    <Typography className={styles.footer_tabtext}>
                      {tab.name}
                    </Typography>
                  </Link>
                </div>
              );
            })}
          </div>
        </Grid>
        <Grid md={3} xs={12} sm={3}>
          <Typography variant="h6">Follow us on</Typography>
          <div className={styles.footer_icondiv}>
            {Icon.map((logo) => {
              return <div className={styles.footer_icon}>{logo.icon}</div>;
            })}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
