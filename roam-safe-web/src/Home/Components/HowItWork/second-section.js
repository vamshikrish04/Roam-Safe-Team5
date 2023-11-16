import { Grid, Typography } from "@mui/material";
import React from "react";
import Images1 from "../../Images/about-2.webp";
import styles from "../../Css/about.module.css";

export default function SecondSection() {
  return (
    <div>
      <Typography sx={{ paddingTop: "10px", fontSize: "2rem" }}>
        How it work
      </Typography>

      <Typography className={styles.about_second_section_text}>
      Embark on a streamlined automotive experience with Roam Safe. When faced 
      with car troubles, simply open the app and request the assistance you need, 
      whether it's immediate repairs, efficient towing, or professional diagnostics.
      Roam Safe's intuitive platform swiftly connects you with nearby automotive experts, 
      ensuring a prompt and reliable solution to your vehicle challenges.
      <br />
      <br />
      Once your request is placed, relax as Roam Safe handles the logistics seamlessly. 
      With live request tracking, transparent quotations, and secure payments, our platform 
      guarantees an effortless service experience, making your journey back on the road as 
      smooth as possible. Roam Safe is your trusted companion, simplifying the complexities 
      of automotive assistance for a stress-free and convenient travel experience.
      </Typography>
    </div>
  );
}
