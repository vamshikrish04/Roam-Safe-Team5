import { Container, Typography } from "@mui/material";
import React from "react";
import styles from "../../Css/about.module.css";

export default function Banner() {
  return (
    <Container maxWidth="xl" className={styles.howitwork_banner_container}>
      <Typography className={styles.about_banner_text}>How it work</Typography>
    </Container>
  );
}
