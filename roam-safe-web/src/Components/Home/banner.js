import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import styles from "../../Css/home.module.css";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function Banner() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [cheackType, setcheackType] = React.useState("");
  // console.log("cheackType",cheackType);
  const handleOpen = () => {
    const id = localStorage.getItem("Id");
    if (id) {
      setOpen(true);
    } else {
      alert("Please log in first");
    }
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);

  useEffect(() => {
    const Type = localStorage.getItem("Type");
    setcheackType(Type);
  }, []);

  return (
    <Container maxWidth="xl" className={styles.banner_outer_container}>
      <div className={styles.banner_outer_div}>
        {cheackType === "User" || cheackType === null ? (
          <Box sx={{ maxWidth: 350, background: "white", padding: "0rem" }}>
            <div style={{ padding: "2rem" }}>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "600",
                  textAlign: "center",
                  lineHeight: "29.05px",
                }}
              >
                Stuck Somewhere <br />
                <span style={{ fontSize: "30px", lineHeight: "36.31px" }}>
                  No Worries!
                </span>
              </Typography>
              <br />
              <br />
              <br />
              <br />
              <Button
                variant="contained"
                color="error"
                sx={{
                  borderRadius: "10px",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
                onClick={handleOpen}
              >
                Book Now
              </Button>
            </div>
          </Box>
        ) : cheackType === "Mechanic" ? (
          <Box sx={{ maxWidth: 350, padding: "0rem" }}>
            <div style={{ padding: "2rem" }}>
              <br />
              <Link to="/booking-history-mechanic">
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    borderRadius: "10px",
                    fontSize: "20px",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  Manage Service
                </Button>
              </Link>
              <br /> <br /> <br /> <br />
            </div>
          </Box>
        ) : cheackType === "Towing" ? (
          <Box sx={{ maxWidth: 350, padding: "0rem" }}>
            <div style={{ padding: "2rem" }}>
              <br />
              <Link to="/booking-history-towing">
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    borderRadius: "10px",
                    fontSize: "20px",
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  Manage Service
                </Button>
              </Link>
              <br /> <br /> <br /> <br />
            </div>
          </Box>
        ) : (
          ""
        )}

        {/* ////////////.............Select Service model........//////////////// */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h2"
                sx={{ textAlign: "center", fontWeight: "600" }}
              >
                Select Service
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "column-reverse",
                  padding: "1rem",
                }}
              >
                <Link to="/mechanic-search-book">
                  <Button
                    fullWidth
                    variant="contained"
                    className={styles.book_service_button}
                  >
                    Regular service
                  </Button>
                </Link>
                <br />
                {/* <Link to="/mechanic-search"> */}
                <Button
                  fullWidth
                  variant="contained"
                  className={styles.book_Emergency_service_button}
                  onClick={handleOpen1}
                >
                  Emergency Service
                </Button>
                {/* </Link> */}
              </div>
            </Box>
          </Fade>
        </Modal>
        {/* ////////////.............Select Service model for emergency........//////////////// */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open1}
          onClose={handleClose1}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open1}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h5"
                component="h2"
                sx={{ textAlign: "center", fontWeight: "600" }}
              >
                Select Emergency Service
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "column-reverse",
                  padding: "1rem",
                }}
              >
                <Link to="/towing-search">
                  <Button
                    fullWidth
                    variant="contained"
                    className={styles.book_service_button}
                  >
                    Towing service
                  </Button>
                </Link>
                <br />
                <Link to="/mechanic-search">
                  <Button
                    fullWidth
                    variant="contained"
                    className={styles.book_Emergency_service_button}
                  >
                    Breakdown service
                  </Button>
                </Link>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </Container>
  );
}
