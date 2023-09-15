import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
// import navlogo from "../../images/navlogo.jpg";
import styles from "../../Css/navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Popover from "@mui/material/Popover";
import { display } from "@mui/system";
// import AccountCircle from "@mui/icons-material/AccountCircle";

const pages = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
  { name: "How it Work", url: "/how-it-work" },
  { name: "Contact", url: "/contact" },
];

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  let history = useNavigate();
  const [userName, setuserName] = React.useState("");
  const [Type, setType] = React.useState("");
  console.log("Type=>", Type);
  console.log("userName=>", userName);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const Vrification = () => {
    let Name = localStorage.getItem("UserName");
    setuserName(Name);
    let TypeUser = localStorage.getItem("Type");
    setType(TypeUser);
  };
  React.useEffect(() => {
    Vrification();
  }, []);

  const Logout = () => {
    localStorage.clear("UserName");
    localStorage.clear("Id");
    localStorage.clear("Cheak");
    localStorage.clear("type");
    window.location.reload();
  };
  return (
    <>
      <AppBar position="static" sx={{ background: "white" }}>
        <Container sx={{ paddingLeft: "0", paddingRight: "0" }}>
          <Toolbar sx={{ paddingLeft: "0", paddingRight: "0" }}>
            <Box
              sx={{ display: { xs: "none", md: "flex" }, width: "4%", ml: 2 }}
            >
              <Link to="/">
                {/* <img
                className={styles.nav_logo2}
                src={navlogo}
                alt="Drdaleel logo"
              /> */}
              </Link>
            </Box>
            <Typography
              variant="h5"
              sx={{
                display: { xs: "none", md: "flex" },
                color: "black",
                fontSize: "32px",
                fontWeight: "700",
              }}
            >
              Roam Safe
            </Typography>
            <AdbIcon sx={{ display: { xs: "none", md: "none" } }} />

            <Box
              sx={{ display: { xs: "flex", md: "none" }, width: "4%", ml: 2 }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon sx={{ width: "100%" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <NavLink to={page.url} style={{ textDecoration: "none" }}>
                      <Typography color={"black"} textAlign="center">
                        {page.name}
                      </Typography>
                    </NavLink>
                  </MenuItem>
                ))}
                {userName === null ? (
                  <div className={styles.login_signup}>
                    <div>
                      {" "}
                      <Link to="/login">
                        <Button variant="contained" color="error">
                          Login
                        </Button>
                        {/* <Typography color="black"> </Typography> */}
                      </Link>
                    </div>
                    <div>
                      <Link to="/sign-up">
                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ color: "black" }}
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: "2rem" }}>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ color: "black" }}
                      onClick={() => {
                        Logout();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "none", md: "none" }, mr: 1 }} />

            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                width: "8%",
                ml: 4,
              }}
            >
              <Link to="/">
                {/* <img
                className={styles.nav_logo2}
                src={navlogo}
                alt="Drdaleel logo"
              />{" "} */}
              </Link>
            </Box>
            <Typography
              variant="h5"
              sx={{
                display: { xs: "flex", md: "none" },
                color: "black",
                fontSize: "32px",
                fontWeight: "700",
              }}
            >
              Roam Safe
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                mx: 2,
                justifyContent: "flex-end",
              }}
            >
              {pages.map((page) => (
                <NavLink to={page.url} style={{ textDecoration: "none" }}>
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 3,
                      mx: 3,
                      color: "black",
                      display: "block",
                      textTransform: "capitalize",
                      fontWeight: "500",
                    }}
                  >
                    {page.name}
                  </Button>
                </NavLink>
              ))}
              {userName === null ? (
                <div className={styles.login_signup}>
                  <div>
                    {" "}
                    <Link to="/login">
                      <Button variant="contained" color="error">
                        Login
                      </Button>
                      {/* <Typography color="black"> </Typography> */}
                    </Link>
                  </div>
                  <div>
                    <Link to="/sign-up">
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ color: "black" }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "1rem",
                  }}
                >
                  <PersonIcon
                    sx={{ fontSize: "2rem", color: "red" }}
                    onClick={handleClick}
                  />
                  <Typography sx={{ color: "black" }}>{userName}</Typography>
                </div>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Link to="/my-profile" sx={{}}>
          <Typography
            sx={{
              pl: 6,
              pr: 6,
              pt: 1,
              pb: 1,
              color: "black",
              textDecoration: "none",
            }}
          >
            My Profile
          </Typography>
        </Link>
        {Type === "User" ? (
          <Link to="/booking-history-user">
            <Typography sx={{ pl: 6, pr: 6, pt: 1, pb: 1, color: "black" }}>
              Booking History
            </Typography>
          </Link>
        ) : (
          ""
        )}
        {Type === "User" ? (
          <Link to="/payment-history-user">
            <Typography sx={{ pl: 6, pr: 6, pt: 1, pb: 1, color: "black" }}>
              Payment History
            </Typography>
          </Link>
        ) : Type === "Towing" ? (
          <Link to="/payment-history-towing">
            <Typography sx={{ pl: 6, pr: 6, pt: 1, pb: 1, color: "black" }}>
              Payment History
            </Typography>
          </Link>
        ) : Type === "Mechanic" ? (
          <Link to="/payment-history-mechanic">
            <Typography sx={{ pl: 6, pr: 6, pt: 1, pb: 1, color: "black" }}>
              Payment History
            </Typography>
          </Link>
        ) : (
          ""
        )}

        <div style={{ padding: "1rem", textAlign: "center" }}>
          <Button
            variant="outlined"
            color="error"
            sx={{ color: "black" }}
            onClick={() => {
              Logout();
            }}
          >
            Logout
          </Button>
        </div>
      </Popover>
    </>
  );
}
export default Navbar;
